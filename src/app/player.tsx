import { Paragraph } from '@/components/Paragraph';
import { colors } from '@/configs/style.config';
import { defaultImages } from '@/constants/image';
import { useLibrary } from '@/store/library';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
	return `${minutes}:${remainingSeconds}`;
};

const PlayerScreen = () => {
	const { currentTrack, tracks, settings, isFavorite, toggleTrackFavorite, setCurrentTrackId } = useLibrary();
	const playbackState = usePlaybackState();
	const progress = useProgress(500);
	const isPlaying = playbackState.state === State.Playing;
	const duration = currentTrack?.duration ?? progress.duration;
	const progressPercentage = duration ? Math.min(progress.position / duration, 1) * 100 : 0;

	const skipWithState = async (direction: 'next' | 'previous') => {
		if (settings.shuffleEnabled && direction === 'next' && tracks.length > 1) {
			const candidates = tracks.filter((track) => track.id !== currentTrack?.id);
			const nextTrack = candidates[Math.floor(Math.random() * candidates.length)];
			if (nextTrack) setCurrentTrackId(nextTrack.id);
		}

		if (direction === 'next') {
			await TrackPlayer.skipToNext();
			return;
		}
		await TrackPlayer.skipToPrevious();
	};

	const seekBy = async (seconds: number) => {
		await TrackPlayer.seekTo(Math.max(progress.position + seconds, 0));
	};

	const togglePlayback = async () => {
		if (isPlaying) {
			await TrackPlayer.pause();
			return;
		}
		await TrackPlayer.play();
	};

	if (!currentTrack) {
		return (
			<View className="flex-1 items-center justify-center bg-black px-6">
				<Paragraph size="xl" weight="semibold">No track selected</Paragraph>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-black px-6 pt-20">
			<Image className="aspect-square w-full rounded-[32px]" source={currentTrack.artwork ?? defaultImages.trackImage} contentFit="cover" />
			<View className="mt-8 flex-row items-center justify-between">
				<View className="flex-1 pr-4">
					<Paragraph size="3xl" weight="bold" numberOfLines={2}>{currentTrack.title}</Paragraph>
					<Paragraph size="lg" color="muted" className="mt-2" numberOfLines={1}>{currentTrack.artist}</Paragraph>
					{currentTrack.album ? <Paragraph color="muted" className="mt-1" numberOfLines={1}>{currentTrack.album}</Paragraph> : null}
				</View>
				<Pressable onPress={() => toggleTrackFavorite(currentTrack)} accessibilityRole="button" accessibilityLabel="Toggle favourite">
					<FontAwesome name={isFavorite(currentTrack) ? 'heart' : 'heart-o'} size={30} color={isFavorite(currentTrack) ? colors.primary : colors.text} />
				</Pressable>
			</View>

			<View className="mt-8">
				<View className="h-2 overflow-hidden rounded-full bg-zinc-800">
					<View className="h-full rounded-full" style={{ width: `${progressPercentage}%`, backgroundColor: colors.primary }} />
				</View>
				<View className="mt-2 flex-row justify-between">
					<Paragraph color="muted">{formatTime(progress.position)}</Paragraph>
					<Paragraph color="muted">{formatTime(duration ?? 0)}</Paragraph>
				</View>
			</View>

			<View className="mt-8 flex-row items-center justify-center gap-4">
				<Pressable accessibilityRole="button" accessibilityLabel="Seek backward 15 seconds" onPress={() => void seekBy(-15)}>
					<Ionicons name="play-back" size={30} color={colors.textMuted} />
				</Pressable>
				<Pressable accessibilityRole="button" accessibilityLabel="Seek forward 15 seconds" onPress={() => void seekBy(15)}>
					<Ionicons name="play-forward" size={30} color={colors.textMuted} />
				</Pressable>
			</View>

			<View className="mt-6 flex-row items-center justify-center gap-10">
				<Pressable accessibilityRole="button" accessibilityLabel="Previous track" onPress={() => void skipWithState('previous')}>
					<Ionicons name="play-skip-back" size={36} color={colors.textMuted} />
				</Pressable>
				<Pressable accessibilityRole="button" accessibilityLabel={isPlaying ? 'Pause' : 'Play'} onPress={() => void togglePlayback()}>
					<View className="h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
						<Ionicons name={isPlaying ? 'pause' : 'play'} size={42} color={colors.text} />
					</View>
				</Pressable>
				<Pressable accessibilityRole="button" accessibilityLabel="Next track" onPress={() => void skipWithState('next')}>
					<Ionicons name="play-skip-forward" size={36} color={colors.textMuted} />
				</Pressable>
			</View>
			<View className="mt-8 flex-row justify-center gap-4">
				<Paragraph color="muted">Shuffle: {settings.shuffleEnabled ? 'on' : 'off'}</Paragraph>
				<Paragraph color="muted">Repeat: {settings.repeatMode}</Paragraph>
			</View>
		</View>
	);
};

export default PlayerScreen;
