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
    Stroke?: boolean;
} & SvgProps;

export function ThemedIcon({ IconComponent, name, size = 24, lightColor, darkColor, style, Stroke = false, ...rest }: ThemedIconProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'Text');

    return (
        name ? 
        <IconComponent {...rest} name={name} size={size} color={color} style={style} />
        :
        Stroke ? 
        <IconComponent width={size} height={size} strokeWidth={3.5} {...rest} stroke={color} style={style} />
        :
        <IconComponent width={size} height={size} {...rest} fill={color} style={style} />
    );
}