# Music Player

React Native / Expo local music player using Expo Router and React Native Track Player.

## Features

- Scan phone-local audio with Expo Media Library permissions.
- Persist favourites, playlists, settings, and the last selected track.
- Browse songs with search and sort chips.
- Create playlists and open existing playlists.
- Use a full player screen with artwork fallback, play/pause, skip, seek, shuffle status, repeat status, and favourite controls.
- Configure scan, filename fallback, shuffle, and repeat options from Settings.

## Scripts

- `pnpm start` — start the Expo development server.
- `pnpm android` — start Expo for Android.
- `pnpm ios` — start Expo for iOS.
- `pnpm web` — start Expo for web.
- `pnpm test` — run Vitest unit tests.
- `pnpm test:watch` — run Vitest in watch mode.
- `pnpm test:coverage` — run unit tests with coverage.
- `pnpm e2e` — run Maestro E2E smoke tests from `e2e/` after installing Maestro and booting a simulator/device.

## Notes

Real-device validation is required for native audio permissions, local file playback, lock-screen controls, and notification controls.
