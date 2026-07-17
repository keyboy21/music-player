# Music Player Roadmap

This project is moving toward a phone-local music player with the expected features of a modern mobile audio app.

## Current foundation

- Expo Router tabs for Songs, Favourites, Playlists, and Settings.
- A shared in-memory library store that exposes tracks, playlists, favourites, the active track, and playlist helpers.
- Basic Songs, Favourites, Playlists, and Player screens wired to the shared store.
- React Native Track Player is installed, but full playback and local media scanning still need to be integrated.

## Missing core features

### 1. Local music discovery

- Request Android audio/media permissions and iOS media-library permissions.
- Scan phone storage/media library for audio files and metadata.
- Normalize discovered files into a track model with stable IDs, URI, title, artist, album, duration, artwork, and date added.
- Provide manual refresh and automatic refresh when the app returns to the foreground.
- Add empty/error states for denied permissions, no local music, and unreadable files.

### 2. Playback engine

- Initialize React Native Track Player once during app startup.
- Convert local library tracks into Track Player queue entries.
- Implement play, pause, seek, skip next/previous, replay current track, and stop.
- Support background playback, lock-screen controls, notification controls, and audio interruptions.
- Persist and restore the last active track, position, queue, repeat mode, shuffle mode, and volume.

### 3. Library browsing

- Add Songs, Artists, Albums, Folders, Genres, Recently Added, and Recently Played views.
- Add sorting by title, artist, album, duration, date added, and play count.
- Add fast search across title, artist, album, and filename.
- Add artwork fallback and metadata editing safeguards for incomplete tags.

### 4. Playlists and queue

- Create, rename, delete, and reorder playlists.
- Add/remove tracks from playlists and support multi-select actions.
- Show a Now Playing queue with drag-and-drop reorder and swipe-to-remove.
- Add "Play next", "Add to queue", "Shuffle all", and "Start radio/mix" actions.

### 5. Favourites and ratings

- Persist favourites locally instead of keeping them only in memory.
- Support star ratings or thumbs-up metadata per track.
- Add smart playlists for favourites, highly rated tracks, and most played tracks.

### 6. Player experience

- Replace placeholder controls with real state-driven controls.
- Add progress slider, elapsed/remaining time, repeat, shuffle, lyrics placeholder, sleep timer, and volume controls.
- Add mini-player above the tab bar for quick playback controls.
- Add responsive tablet layout and accessibility labels for all playback actions.

### 7. Settings

- Add theme selection, scan folders, ignored folders, audio focus behavior, cache management, and privacy controls.
- Add import/export for playlists and app settings.
- Add diagnostics for Track Player state, permissions, and indexed track count.

## Potential improvements

- Use persistent storage such as SQLite for library metadata and AsyncStorage/MMKV for lightweight settings.
- Add a repository layer so UI components do not depend directly on storage or Track Player APIs.
- Add skeleton loading states and polished empty states.
- Add E2E smoke tests for tab navigation, search, favourite toggling, and player launch.
- Add unit tests for library filtering, playlist helpers, and favourite toggling.

## Refactoring plan

1. Split the current library store into `library`, `playback`, `playlists`, and `settings` domains.
2. Move mock track data behind a repository interface so it can be replaced by a local-device scanner.
3. Introduce typed UI primitives for screen containers, list empty states, section headers, and icon buttons.
4. Keep Track Player side effects in hooks/services and expose serializable playback state to screens.
5. Add tests around each refactor before replacing mock data with real local media.

## Suggested milestone order

1. Stabilize current UI and mock data flows.
2. Add persistent favourites and settings.
3. Integrate Track Player queue/playback for bundled or mock URIs.
4. Add local media permissions and scanning.
5. Replace mock library data with scanned phone music.
6. Add playlists, queue editing, mini-player, and advanced settings.
