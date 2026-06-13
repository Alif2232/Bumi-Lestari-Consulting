// ============================================
// 📁 apps/web/src/lib/email.ts
// ============================================
// Nama       : Email Notification Utility
// Fungsi     : Mengirim email notifikasi ke admin
//              ketika ada lead baru dari form kontak
// Penjelasan : 
//   - Gunakan Resend API (resend.com) untuk kirim email
//   - Jika RESEND_API_KEY tidak di-set, email tidak dikirim
//     (tidak error, hanya log warning)
//   - Format email: HTML responsif dengan data lead
// ============================================

import { Resend } from "resend";
import type { ContactFormData } from "@/lib/validation";
import { CONTACT_INFO } from "@/lib/constants";

// 👇 Inisialisasi Resend — hanya jika API key tersedia
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// 👇 Mapping service ID ke nama layanan yang user-friendly
const SERVICE_LABELS: Record<string, string> = {
  "konsultasi-lahan": "Konsultasi & Analisis Lahan",
  "manajemen-hama": "Manajemen Hama & Penyakit",
  "pelatihan": "Pelatihan & Pendampingan",
  "program-pemerintah": "Pendampingan Program Pemerintah",
  "audit-lahan": "Audit & Evaluasi Lahan",
  "kemitraan": "Kemitraan & Investasi",
  "lainnya": "Lainnya",
};

// 👇 formatDate: Format tanggal Indonesia
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

// 👇 getServiceLabel: Dapatkan label layanan dari ID
function getServiceLabel(serviceId: string): string {
  return SERVICE_LABELS[serviceId] || serviceId;
}

// 👇 buildEmailHTML: Generate HTML email responsif
function buildEmailHTML(data: ContactFormData): string {
  const submittedAt = formatDate(new Date());

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#F8F5F0;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr>
      <td style="background-color:#1B3A2D;padding:24px 32px;text-align:center;">
        <h1 style="color:#F8F5F0;margin:0;font-size:20px;">🌾 Notifikasi Lead Baru</h1>
        <p style="color:#C8963E;margin:8px 0 0;font-size:14px;">Bumi Lestari Consulting</p>
      </td>
    </tr>
    <tr>
      <td style="background-color:#FFFFFF;padding:32px;border-radius:0 0 12px 12px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #E5E5E5;">
              <strong style="color:#6B6B6B;font-size:12px;display:block;">NAMA LENGKAP</strong>
              <span style="color:#1B3A2D;font-size:16px;">${data.name}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #E5E5E5;">
              <strong style="color:#6B6B6B;font-size:12px;display:block;">EMAIL</strong>
              <span style="color:#1B3A2D;font-size:16px;">${data.email}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #E5E5E5;">
              <strong style="color:#6B6B6B;font-size:12px;display:block;">NOMOR WHATSAPP</strong>
              <span style="color:#1B3A2D;font-size:16px;">${data.phone}</span>
            </td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #E5E5E5;">
              <strong style="color:#6B6B6B;font-size:12px;display:block;">PERUSAHAAN</strong>
              <span style="color:#1B3A2D;font-size:16px;">${data.company}</span>
            </td>
          </tr>` : ""}
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #E5E5E5;">
              <strong style="color:#6B6B6B;font-size:12px;display:block;">LAYANAN DIMINATI</strong>
              <span style="color:#1B3A2D;font-size:16px;">${getServiceLabel(data.service)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;">
              <strong style="color:#6B6B6B;font-size:12px;display:block;">PESAN</strong>
              <p style="color:#1B3A2D;font-size:14px;margin:4px 0 0;line-height:1.6;background-color:#F8F5F0;padding:16px;border-radius:8px;">${data.message.replace(/\n/g, "<br>")}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;text-align:center;">
        <p style="color:#9A9A9A;font-size:12px;margin:0;">
          Dikirim otomatis dari website Bumi Lestari Consulting<br>
          ${submittedAt}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// 👇 sendLeadNotification: Kirim notifikasi email ke admin
//    Jika RESEND_API_KEY tidak tersedia, log warning saja (tidak throw error)
//    return { success: boolean, error?: string }
export async function sendLeadNotification(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  // Jika Resend tidak dikonfigurasi, skip
  if (!resend) {
    console.warn("⚠️  RESEND_API_KEY tidak ditemukan. Email notifikasi tidak dikirim.");
    console.warn("   Daftar gratis di https://resend.com dan set RESEND_API_KEY di .env");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || CONTACT_INFO.email;

  try {
    await resend.emails.send({
      from: `Bumi Lestari <notifikasi@${process.env.RESEND_DOMAIN || "bumilestari.co.id"}>`,
      to: notificationEmail,
      subject: `🌾 Lead Baru: ${data.name} — ${getServiceLabel(data.service)}`,
      html: buildEmailHTML(data),
      replyTo: data.email,
    });

    console.log(`✅ Email notifikasi terkirim ke ${notificationEmail}`);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Gagal kirim email notifikasi:", message);
    return { success: false, error: message };
  }
}
