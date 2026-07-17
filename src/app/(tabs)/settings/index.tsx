import { Paragraph } from '@/components/Paragraph';
import { colors } from '@/configs/style.config';
import { useLibrary } from '@/store/library';
import { ActivityIndicator, Pressable, Switch, View } from 'react-native';

const SettingsScreen = () => {
	const { tracks, permissionStatus, isScanning, scanError, scanLocalMusic, settings, setSettings } = useLibrary();

	return (
		<View className="flex-1 gap-5 px-4 pt-6">
			<View>
				<Paragraph size="2xl" weight="bold">Local music library</Paragraph>
				<Paragraph color="muted" className="mt-2">
					{tracks.length} indexed tracks • Permission: {permissionStatus}
				</Paragraph>
				{scanError ? <Paragraph color="error" className="mt-2">{scanError}</Paragraph> : null}
			</View>

			<Pressable
				accessibilityRole="button"
				className="items-center rounded-2xl px-4 py-4"
				style={{ backgroundColor: colors.primary }}
				onPress={() => void scanLocalMusic()}
				disabled={isScanning}
			>
				{isScanning ? <ActivityIndicator color={colors.text} /> : <Paragraph weight="bold">Scan phone music</Paragraph>}
			</Pressable>

			<SettingSwitch
				label="Auto-scan on launch"
				description="Refresh the local music index whenever the app starts."
				value={settings.autoScanOnLaunch}
				onValueChange={(value) => setSettings({ autoScanOnLaunch: value })}
			/>
			<SettingSwitch
				label="Show filenames"
				description="Use file names as a fallback when local metadata is incomplete."
				value={settings.showFilenames}
				onValueChange={(value) => setSettings({ showFilenames: value })}
			/>
		</View>
	);
};

const SettingSwitch = ({ label, description, value, onValueChange }: SettingSwitchProps) => (
	<View className="flex-row items-center justify-between gap-4 rounded-2xl bg-zinc-900 p-4">
		<View className="flex-1">
			<Paragraph size="lg" weight="semibold">{label}</Paragraph>
			<Paragraph color="muted" className="mt-1">{description}</Paragraph>
		</View>
		<Switch value={value} onValueChange={onValueChange} />
	</View>
);

type SettingSwitchProps = {
	label: string;
	description: string;
	value: boolean;
	onValueChange: (value: boolean) => void;
};

export default SettingsScreen;
