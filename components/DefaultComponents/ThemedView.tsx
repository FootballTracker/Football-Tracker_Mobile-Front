import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    midnightColor?: string;
    colorName?: keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.midnight;
};

export function ThemedView({ style, lightColor, darkColor, midnightColor, colorName = 'LightBackground', ...otherProps }: ThemedViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor, midnight: midnightColor }, colorName);

    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}