import { Animated, RefreshControl, ScrollView, type ScrollViewProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCallback, useState } from 'react';


export type ThemedScrollViewProps = ScrollViewProps & {
    lightColor?: string;
    darkColor?: string;
    scrollRef?: React.Ref<ScrollView | Animated.LegacyRef<ScrollView>> | undefined;
    getData?: () => Promise<void>;
};

export function AnimatedThemedScrollView({ style, lightColor, darkColor, getData, scrollRef, ...otherProps }: ThemedScrollViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'LightBackground');
    const { theme } = useTheme();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        getData && await getData();
        setRefreshing(false);
    }, []);

    return <Animated.ScrollView
            ref={scrollRef}
            style={[{ backgroundColor }, style]}
            refreshControl={getData ?
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors[theme].Red]} progressBackgroundColor={Colors[theme].DarkBackground} />
                : undefined}
            {...otherProps}
        />
        
};