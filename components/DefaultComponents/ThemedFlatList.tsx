import { FlatList, RefreshControl, type FlatListProps } from "react-native";
import { useTheme } from '@/context/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCallback, useState } from "react";
import { Colors } from "@/constants/Colors";

export type ThemedFlatListProps = FlatListProps<any> & {
    lightColor?: string;
    darkColor?: string;
    getData?: () => Promise<void>;
};

export function ThemedFlatList({ style, lightColor, darkColor, getData, data, renderItem, ...otherProps }: ThemedFlatListProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'LightBackground');
    const { theme } = useTheme();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        getData && await getData();
        setRefreshing(false);
    }, []);

    return (
        <FlatList 
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshControl={getData ?
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors[theme].Red]} progressBackgroundColor={Colors[theme].DarkBackground} />
                : undefined
            }
            style = {[{ backgroundColor }, style]}
            {...otherProps}
        />
    )
}