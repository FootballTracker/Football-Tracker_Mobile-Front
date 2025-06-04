/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

//Imports
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';

//
type colorType = keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.midnight;
type multiColorType = { light: string; dark: string, midnight: string };

export function useThemeColor( props: { light?: string; dark?: string, midnight?: string }, colorName: colorType ) {
    const { theme } = useTheme();
    let colorFromProps = props[theme];
    
    if(theme == 'midnight' && !props.midnight && props.dark) colorFromProps = props.dark;

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

export function themedColor(color: colorType): string;
export function themedColor(props: multiColorType): string;

export function themedColor( arg: colorType | multiColorType ): string {
    const { theme } = useTheme();
  
    if (typeof arg === 'string') {
        return Colors[theme][arg];
    }
  
    return arg[theme] ?? '';
}