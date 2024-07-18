import { cn } from '@/utils/cn.util'
import { ComponentProps } from 'react'
import { Text } from 'react-native'

export const Paragraph = ({
     size = 'base', weight = 'normal', fontStyle = 'normal', className, children, ...props }: ParagraphProps) => {
     return (
          <Text className={cn(
               {
                    'text-xs': size === 'xs',
                    'text-sm': size === 'sm',
                    'text-base': size === 'base',
                    'text-lg': size === 'lg',
                    'text-xl': size === 'xl',
                    'text-2xl': size === '2xl',
                    'text-3xl': size === '3xl',
                    'text-4xl': size === '4xl',
                    'text-5xl': size === '5xl',
               },
               {
                    'font-light': weight === 'light',
                    'font-normal': weight === 'normal',
                    'font-medium': weight === 'medium',
                    'font-semibold': weight === 'semibold',
                    'font-bold': weight === 'bold',
               },
               {
                    'not-italic': fontStyle === 'normal',
                    italic: fontStyle === 'italic',
               },
               className)}
               {...props}
          >
               {children}
          </Text>
     )
}

type ParagraphProps = ComponentProps<typeof Text> & {
     className?: string
     size?: TextSize;
     weight?: TextWeight;
     fontStyle?: TextStyle;
     children: React.ReactNode
}

type TextSize =
     | 'xs'
     | 'sm'
     | 'base'
     | 'lg'
     | 'xl'
     | '2xl'
     | '3xl'
     | '4xl'
     | '5xl';
type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
type TextStyle = 'normal' | 'italic';

