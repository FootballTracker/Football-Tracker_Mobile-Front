import { Text, type TextProps, StyleSheet, Animated } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    midnightColor?: string;
    colorName?: keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.midnight
    color?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  colorName = 'Text',
  color,
  midnightColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const TextColor = color ?? useThemeColor({ light: lightColor, dark: darkColor, midnight: midnightColor }, colorName);

  return (
    <Animated.Text
      style={[
        { color: TextColor },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#0a7ea4',
  },
});
