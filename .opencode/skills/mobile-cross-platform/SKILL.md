---
name: mobile-cross-platform
description: Patterns for React Native (Expo) and Flutter — navigation, state management, native modules, build CI, and when to choose one over the other
license: MIT
compatibility: opencode
metadata:
  audience: mobile-engineers
  stack: mobile-rn-flutter
---

## What I do

Provide canonical patterns for building mobile apps with React Native (Expo) and Flutter — covering navigation, state management, native modules, build/CI, and platform-specific gotchas.

## When to use me

Load this skill when:
- Starting a new mobile app
- Choosing between React Native (Expo) and Flutter
- Setting up navigation, state, or persistence
- Working with native modules (camera, location, notifications, etc.)
- Configuring builds for iOS/Android
- Setting up EAS Build (RN) or Codemagic/Fastlane (Flutter)

## RN vs Flutter — Decision

| Dimension | React Native (Expo) | Flutter |
|---|---|---|
| **Language** | TypeScript / JS | Dart |
| **Code sharing with web** | ✅ (React/TS) | ❌ (separate codebase) |
| **Performance** | Near-native (Hermes) | Native (compiled AOT) |
| **UI consistency across platforms** | Mixed (some platform styling) | Excellent (custom rendering) |
| **Animation** | Reanimated 3 / Skia | Built-in, excellent |
| **Hot reload** | Fast Refresh | Hot Reload |
| **Native module access** | EAS Build + config plugins | Platform channels |
| **Team learning curve** | Low if team knows React | Medium (new language) |
| **Bundle size** | Larger | Larger (engine) |
| **Long-term maintenance** | Good (Meta backing) | Excellent (Google backing) |
| **Best for** | Teams with React skills, web sharing | Performance-critical, custom UI, animations |

**For this project (web in Next.js, plan-first, 2-5 devs):**
- If your web team is React-strong → **React Native (Expo)**
- If you need maximum performance / custom UI / animations → **Flutter**
- If you have both → pick one to start; reuse via "feature parity" not "code sharing"

## React Native (Expo) Patterns

### Project Structure

```
apps/mobile-rn/
├── app/                          # Expo Router (file-based)
│   ├── _layout.tsx               # Root layout
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab bar
│   │   ├── index.tsx
│   │   └── profile.tsx
│   └── settings.tsx
├── src/
│   ├── components/
│   ├── hooks/
│   ├── stores/                   # Zustand stores
│   ├── api/                      # tRPC or fetch client
│   └── lib/
├── assets/
├── app.config.ts                 # Expo config
├── eas.json                      # EAS Build config
└── package.json
```

### Expo Router (file-based, like Next.js)

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
```

```tsx
// app/(auth)/login.tsx
import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <View>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <Button title="Login" onPress={() => router.replace('/(tabs)')} />
    </View>
  );
}
```

**Why Expo Router:** mirrors Next.js mental model. Great for teams using both.

### State Management — Zustand (recommended)

```ts
// src/stores/auth.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        set({ user: res.data.user, token: res.data.token });
      },
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

**Why Zustand over Redux:** 10× less boilerplate, no provider, easy to test.

### Server State — TanStack Query

```tsx
import { useQuery } from '@tanstack/react-query';

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => api.get(`/users/${id}`).then(r => r.data),
    staleTime: 5 * 60 * 1000, // 5 min
  });
}
```

### Native Modules (Expo)

Prefer Expo's managed modules. For custom needs, use **config plugins** or **development builds**:

```ts
// app.config.ts
export default {
  expo: {
    plugins: [
      ['expo-camera', { cameraPermission: 'Allow camera to scan QR codes.' }],
      ['expo-location', { locationAlwaysAndWhenInUsePermission: 'Allow location.' }],
    ],
  },
};
```

For truly custom native code, switch to a **development build** (`npx expo prebuild`) and write a config plugin or local module.

### EAS Build (CI/CD)

```json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": { "simulator": true }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": { "ascAppId": "1234567890" },
      "android": {}
    }
  }
}
```

```bash
# Build for iOS
eas build --platform ios --profile production

# Build for Android
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
```

### Testing

- **Unit:** Jest
- **Component:** React Native Testing Library
- **E2E:** Maestro (recommended) or Detox
- **Mock native modules** in unit tests; use E2E for real native interactions

## Flutter Patterns

### Project Structure

```
apps/mobile-flutter/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── core/                     # Theme, constants, utils
│   ├── data/                     # Repositories, DTOs
│   ├── domain/                   # Entities, use cases (optional)
│   ├── features/                 # Feature-based
│   │   ├── auth/
│   │   │   ├── data/
│   │   │   ├── presentation/
│   │   │   └── auth.dart         # Barrel file
│   │   └── home/
│   ├── routing/                  # go_router config
│   └── shared/                   # Shared widgets
├── test/                         # Unit & widget tests
├── integration_test/             # E2E tests
├── pubspec.yaml
└── analysis_options.yaml
```

### State Management — Riverpod (recommended)

```dart
// lib/features/auth/auth_controller.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

final authControllerProvider = StateNotifierProvider<AuthController, AuthState>((ref) {
  return AuthController(ref.read(authRepoProvider));
});

class AuthController extends StateNotifier<AuthState> {
  final AuthRepo _repo;

  AuthController(this._repo) : super(const AuthState.initial());

  Future<void> login(String email, String password) async {
    state = const AuthState.loading();
    try {
      final user = await _repo.login(email, password);
      state = AuthState.authenticated(user);
    } catch (e) {
      state = AuthState.error(e.toString());
    }
  }
}
```

```dart
// Usage in widget
class LoginScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(authControllerProvider);
    // ...
  }
}
```

**Riverpod vs Bloc:**
- **Riverpod**: simpler, less boilerplate, testable
- **Bloc**: more structured, better for very large teams, event-sourced state

For most teams, **Riverpod is the right default**.

### Models with `freezed`

```dart
@freezed
class User with _$User {
  const factory User({
    required String id,
    required String email,
    required String name,
  }) = _User;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}
```

### Navigation — go_router

```dart
// lib/routing/router.dart
final router = GoRouter(routes: [
  GoRoute(path: '/', builder: (_, __) => const HomeScreen()),
  GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
  GoRoute(
    path: '/users/:id',
    builder: (_, state) => UserDetailScreen(id: state.pathParameters['id']!),
  ),
]);
```

### Build & Deploy

```bash
# iOS
flutter build ipa
# Upload via Xcode Organizer or Transporter

# Android
flutter build appbundle --release
# Upload to Play Console

# Codemagic CI/CD recommended (Flutter-first)
```

### Testing

- **Unit:** `flutter test`
- **Widget:** `testWidgets(...)`
- **E2E:** `integration_test`
- **Mocking:** `mocktail` (works with null safety)

## Cross-Platform Gotchas

| Gotcha | RN (Expo) | Flutter |
|---|---|---|
| **Keyboard avoiding** | `KeyboardAvoidingView` (iOS) / `android:windowSoftInputMode` (Android) | `Scaffold.resizeToAvoidBottomInset` |
| **Safe area (notch)** | `SafeAreaView` from `react-native-safe-area-context` | `SafeArea` widget |
| **Status bar** | `StatusBar` component or `expo-status-bar` | `SystemChrome.setSystemUIOverlayStyle` |
| **Deep linking** | Expo Router handles; `app.config.ts` | `go_router` + iOS/Android manifests |
| **Push notifications** | `expo-notifications` | `firebase_messaging` or `awesome_notifications` |
| **Storage** | `AsyncStorage` (slow) or `expo-sqlite` / `MMKV` | `shared_preferences` (slow) or `drift`/`isar` |
| **Background tasks** | `expo-background-fetch`, `expo-task-manager` | `workmanager` (Android), `BGTaskScheduler` (iOS) |
| **App icons** | `app.config.ts` + `icon.png` | `flutter_launcher_icons` package |
| **Splash screen** | `expo-splash-screen` | `flutter_native_splash` |

## Build & Distribution Checklist

### iOS
- [ ] Apple Developer account ($99/yr)
- [ ] App ID & provisioning profile
- [ ] App icon (1024×1024, no transparency)
- [ ] Launch screen
- [ ] Privacy manifest (`PrivacyInfo.xcprivacy`, required since 2024)
- [ ] TestFlight for beta
- [ ] App Store review (1-3 days typical)

### Android
- [ ] Google Play Developer account ($25 one-time)
- [ ] App Bundle (`.aab`), not APK
- [ ] Signing key (managed via Play App Signing)
- [ ] App icon (512×512)
- [ ] Adaptive icon (foreground + background)
- [ ] Privacy policy URL
- [ ] Content rating questionnaire
- [ ] Internal testing track → closed → production

## Common Anti-Patterns

| Anti-pattern | Why bad | Fix |
|---|---|---|
| Using `ScrollView` for long lists | Performance disaster at 100+ items | Use `FlatList` / `FlashList` (RN) or `ListView.builder` (Flutter) |
| Storing tokens in plain AsyncStorage / shared_preferences | Token theft risk | Use Keychain (iOS) / EncryptedSharedPreferences (Android) or `expo-secure-store` / `flutter_secure_storage` |
| Inline styles everywhere | Unmaintainable | Extract to `StyleSheet` / theme |
| Hardcoded API URLs | Can't change between env | Use `Constants.expoConfig.extra.apiUrl` (RN) or `--dart-define` (Flutter) |
| No offline handling | App crashes on bad network | Use TanStack Query / Riverpod's `AsyncValue` for proper loading/error states |
| Reimplementing platform UI from scratch | Doesn't feel native | Use platform-specific components (or accept non-native UI) |
| Skipping code signing setup early | Painful scramble at launch | Set up EAS / signing on day 1 |
