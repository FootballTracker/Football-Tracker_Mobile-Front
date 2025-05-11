/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

//Imports
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

//
type colorType = keyof typeof Colors.light & keyof typeof Colors.dark;
type multiColorType = { light: string; dark: string };

export function useThemeColor( props: { light?: string; dark?: string }, colorName: colorType ) {
    const { theme } = useColorScheme();
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

export function themedColor(color: colorType): string;
export function themedColor(props: multiColorType): string;

export function themedColor( arg: colorType | multiColorType ): string {
    const { theme } = useColorScheme();
  
    if (typeof arg === 'string') {
        return Colors[theme][arg];
    }
  
    return arg[theme] ?? '';
}