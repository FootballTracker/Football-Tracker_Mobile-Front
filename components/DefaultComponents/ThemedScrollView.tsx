import { RefreshControl, ScrollView, type ScrollViewProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCallback, useState } from 'react';


export type ThemedScrollViewProps = ScrollViewProps & {
    lightColor?: string;
    darkColor?: string;
    midnightColor?: string;
    colorName?: keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.midnight
    getData?: () => Promise<void>
};

export function ThemedScrollView({ style, lightColor, darkColor, getData, midnightColor, colorName = 'LightBackground', ...otherProps }: ThemedScrollViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor, midnight: midnightColor }, colorName);
    const { theme } = useTheme();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        getData && await getData();
        setRefreshing(false);
    }, []);

    return <ScrollView
            style={[{ backgroundColor }, style]}
            refreshControl={getData ?
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors[theme].Red]} progressBackgroundColor={Colors[theme].DarkBackground} />
                : undefined}
            {...otherProps}
        />
        
};