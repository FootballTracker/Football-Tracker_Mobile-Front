import { StyleSheet, View, Animated, useWindowDimensions, LayoutChangeEvent, Pressable } from 'react-native';
import type { TabBarProps } from 'react-native-tab-view';
import { Colors } from '@/constants/Colors';
import { useState, useEffect, useRef } from 'react';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";

export const CustomTabBar: React.FC<TabBarProps<any>> = ({ navigationState, jumpTo }) => {
    const layout = useWindowDimensions();
    const [textSizes, setTextSizes] = useState<{ [key: number]: number }>({});
    const totalTabs = navigationState.routes.length;

    const indicatorTranslateX = useRef(new Animated.Value(0)).current;
    const indicatorWidth = useRef(new Animated.Value(0)).current;

    const handleLayout = (event: LayoutChangeEvent, index: number) => {
        const { width } = event.nativeEvent.layout;
        setTextSizes(prev => ({ ...prev, [index]: width }));
    };

    useEffect(() => {
        const currentIndex = navigationState.index;
        const baseX = (layout.width / totalTabs) * currentIndex;
        const newWidth = textSizes[currentIndex];

        if (newWidth != null) {
            Animated.parallel([
                Animated.timing(indicatorTranslateX, {
                    toValue: baseX,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(indicatorWidth, {
                    toValue: newWidth,
                    duration: 100,
                    useNativeDriver: false, // width não pode usar useNativeDriver
                }),
            ]).start();
        }
    }, [navigationState.index, layout.width, textSizes]);


    return (
        <View style={styles.wrapper}>
            <View style={styles.tabBar}>
                {navigationState.routes.map((route, index) => {
                const isFocused = navigationState.index === index;
                const isLast = index === navigationState.routes.length - 1;
        
                return (
                    <Pressable
                        key={route.key}
                        style={[styles.tabItem, isFocused && styles.activeTab, isLast && styles.lastTabItem]}
                        onPress={() => jumpTo(route.key)}
                    >
                        <ThemedText style={[styles.tabText, isFocused && styles.activeText]} onLayout={(e) => handleLayout(e, index)}>
                            {route.title}
                        </ThemedText>
                    </Pressable>
                );
                })}
            </View>

            <Animated.View
                style={[styles.indicator, {width: layout.width / navigationState.routes.length, transform: [{translateX: indicatorTranslateX }] }]}
            >
                <Animated.View 
                    style={[styles.indicatorChildren, {width: indicatorWidth}]}
                />
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: "100%",
    },
    tabItem: {
        flex: 1,
        paddingTop: 1,
        paddingBottom: 1,
        alignItems: 'center',
        borderRightWidth: 0.3,
        borderColor: Colors.dark.DarkerText,
    },
    lastTabItem: {
        borderRightWidth: 0,
    },
    activeTab: {
    
    },
    tabText: {
        color: Colors.dark.DarkerText,
        fontFamily: "Kokoro",
        fontSize: 16,
        lineHeight: 16,
        top: 3
    },
    activeText: {
        color: Colors.dark.Red,
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 4
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        height: 3,
    },
    indicatorChildren: {
        height: 3,
        backgroundColor: Colors.dark.Red,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5
    }
});