import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedIconProps = {
    IconComponent: React.ComponentType<any>; // Ex: Ionicons, MaterialIcons...
    name: string;
    size?: number;
    lightColor?: string;
    darkColor?: string;
    style?: StyleProp<any>;
};

export function ThemedIcon({ IconComponent, name, size = 24, lightColor, darkColor, style, }: ThemedIconProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'Text');

    return (
        <IconComponent name={name} size={size} color={color} style={style} />
    );
}