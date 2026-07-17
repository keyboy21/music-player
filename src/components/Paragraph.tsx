import type { ComponentProps, ReactNode } from 'react';
import { Text } from 'react-native';

const sizeClassNames = {
	xs: 'text-xs',
	sm: 'text-sm',
	base: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl',
	'2xl': 'text-2xl',
	'3xl': 'text-3xl',
	'4xl': 'text-4xl',
	'5xl': 'text-5xl',
} satisfies Record<TextSize, string>;

const weightClassNames = {
	light: 'font-light',
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
} satisfies Record<TextWeight, string>;

const textColorClassNames = {
	default: 'text-white',
	muted: 'text-gray-400',
	error: 'text-red-600',
} satisfies Record<TextColor, string>;

const fontStyleClassNames = {
	normal: 'not-italic',
	italic: 'italic',
} satisfies Record<TextFontStyle, string>;

export const Paragraph = ({
	size = 'base',
	weight = 'normal',
	fontStyle = 'normal',
	color = 'default',
	className,
	children,
	...props
}: ParagraphProps) => {
	return (
		<Text
			className={[
				sizeClassNames[size],
				weightClassNames[weight],
				fontStyleClassNames[fontStyle],
				textColorClassNames[color],
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}
		>
			{children}
		</Text>
	);
};

type ParagraphProps = ComponentProps<typeof Text> & {
	size?: TextSize;
	weight?: TextWeight;
	fontStyle?: TextFontStyle;
	color?: TextColor;
	children: ReactNode;
};

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
type TextFontStyle = 'normal' | 'italic';
type TextColor = 'default' | 'muted' | 'error';
