import React from 'react';
import { StyleProp } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SvgProps } from 'react-native-svg';

export type ThemedIconProps = {
    IconComponent: React.ComponentType<any>; // Ex: Ionicons, MaterialIcons...
    name?: string;
    size?: number;
    lightColor?: string;
    darkColor?: string;
    style?: StyleProp<any>;
    width?: number;
    height?: number;
} & SvgProps;

export function ThemedIcon({ IconComponent, name, size = 24, lightColor, darkColor, style, ...rest }: ThemedIconProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'Text');

    return (
        name ? 
        <IconComponent {...rest} name={name} size={size} color={color} style={style} />
        :
        <IconComponent {...rest} fill={color} style={style} />
    );
}