import { StyleSheet, View, Animated, useWindowDimensions, Pressable, ScrollView } from 'react-native';
import type { TabBarProps } from 'react-native-tab-view';
import { Colors } from '@/constants/Colors';
import { useEffect, useRef } from 'react';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { useTheme } from '@/context/ThemeContext';

export const CustomTabBar: React.FC<TabBarProps<any>> = ({ navigationState, jumpTo, position }) => {
    const layout = useWindowDimensions();
    const totalTabs = navigationState.routes.length;
    const tabWidth = totalTabs > 3 ? layout.width * 0.31 : layout.width /navigationState.routes.length;
    const scrollRef = useRef<ScrollView>(null);
    const { theme } = useTheme();

    // Faz scroll para deixar a aba selecionada visível
    useEffect(() => {
        const offsetX = Math.max(0, tabWidth * navigationState.index - layout.width / 2 + tabWidth / 2);
        scrollRef.current?.scrollTo({ x: offsetX, animated: true });
    }, [navigationState.index]);

    const translateX = position.interpolate({
        inputRange: navigationState.routes.map((_, i) => i),
        outputRange: navigationState.routes.map((_, i) => i * tabWidth),
    });
    
    
    const styles = StyleSheet.create({
        wrapper: {
            height: 28,
        },
        scrollView: {
            height: "100%",
        },
        tabBar: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            minWidth: layout.width
        },
        tabItem: {
            flex: 1,
            alignItems: 'center',
            justifyContent: "center",
            borderRightWidth: 0.3,
            borderColor: Colors[theme].DarkerText,
        },
        lastTabItem: {
            borderRightWidth: 0,
        },
        activeTab: {
        
        },
        tabText: {
            color: Colors[theme].DarkerText,
            fontFamily: "Kokoro",
            fontSize: 16,
            lineHeight: 20,
        },
        activeText: {
            color: Colors[theme].Red,
            paddingLeft: 4,
            paddingRight: 4,
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
            borderRadius: 5,
            width: '75%',
            maxWidth: 103
        }
    });

    return (
        <View style={styles.wrapper}>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
            >
                    <View style={styles.tabBar}>
                        {navigationState.routes.map((route, index) => {
                            const isFocused = navigationState.index === index;
                            const isLast = index === navigationState.routes.length - 1;

                            return (
                                <Pressable
                                    key={route.key}
                                    style={[styles.tabItem, isFocused && styles.activeTab, isLast && styles.lastTabItem, { width: tabWidth } ]}
                                    onPress={() => jumpTo(route.key)}
                                >
                                    <ThemedText style={[styles.tabText, isFocused && styles.activeText]} >
                                        {route.title}
                                    </ThemedText>
                                </Pressable>
                            );
                        })}
                    </View>

                    <Animated.View
                        style={[styles.indicator, { width: tabWidth, transform: [{ translateX }] }]}
                    >
                        <Animated.View 
                            style={styles.indicatorChildren}
                        />
                    </Animated.View>

            </ScrollView>
        </View>
    );
};