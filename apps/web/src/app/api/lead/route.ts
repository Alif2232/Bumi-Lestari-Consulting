// ============================================
// 📁 apps/web/src/app/api/lead/route.ts
// ============================================
// Nama       : API Route — Form Kontak
// Fungsi     : Menerima data dari form kontak website,
//              validasi dengan Zod, simpan ke database,
//              kirim email notifikasi ke admin
// Endpoint   : POST /api/lead
// Body       : JSON (name, email, phone, company?, service, message)
// Response   : 201 { success: true, data: { id, name } }
//              400 { success: false, error: "..." } (validasi gagal)
//              429 { success: false, error: "..." } (rate limit)
//              500 { success: false, error: "..." } (server error)
// ============================================

import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { prisma } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";
import { headers } from "next/headers";

// 👇 Rate limiting sederhana (in-memory — reset saat server restart)
//    Batasi: max 5 request per IP dalam 60 detik
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 detik
const RATE_LIMIT_MAX = 5; // maksimal 5 request

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Jika belum ada entry atau sudah expired, buat baru
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  // Jika dalam window dan belum melebihi limit
  if (entry.count < RATE_LIMIT_MAX) {
    entry.count += 1;
    return { allowed: true };
  }

  // Rate limited
  const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
  return { allowed: false, retryAfter };
}

// 👇 GET: Simple health check
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Bumi Lestari Contact API",
    version: "1.0.0",
  });
}

// 👇 POST: Menerima data form kontak
export async function POST(request: Request) {
  try {
    // ---- RATE LIMITING ----
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim()
      || headersList.get("x-real-ip")
      || "127.0.0.1";

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Terlalu banyak permintaan. Coba lagi dalam ${rateCheck.retryAfter} detik.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateCheck.retryAfter) },
        }
      );
    }

    // ---- VALIDASI ----
    const body = await request.json();

    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      // ☝️ Gunakan result.error.issues (API Zod v4 — beda dengan Zod v3 yang pakai .errors)
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          error: "Validasi gagal. Periksa kembali data Anda.",
          fields: fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // ---- SIMPAN KE DATABASE ----
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        service: data.service,
        message: data.message,
        status: "new",
      },
    });

    console.log(`✅ Lead baru tersimpan: ${data.name} (${data.email})`);

    // ---- KIRIM EMAIL NOTIFIKASI (async — tidak blocking response) ----
    //    Jalankan di background agar response cepat
    sendLeadNotification(data).then((emailResult) => {
      if (emailResult.success) {
        console.log("✅ Email notifikasi terkirim");
      } else {
        console.warn("⚠️  Email notifikasi tidak terkirim:", emailResult.error);
      }
    });

    // ---- RESPONSE SUKSES ----
    return NextResponse.json(
      {
        success: true,
        message: "Pesan berhasil dikirim! Tim Bumi Lestari akan menghubungi Anda dalam 1x24 jam.",
        data: {
          id: lead.id,
          name: lead.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // ---- ERROR HANDLING ----
    console.error("❌ Error di /api/lead:", error);

    // Handle JSON parse error
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "Format data tidak valid. Kirim dalam format JSON.",
        },
        { status: 400 }
      );
    }

    // Handle Prisma error
    if (error instanceof Error && "code" in error) {
      console.error("   Prisma error code:", (error as any).code);
    }

    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan server. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
