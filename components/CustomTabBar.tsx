import { StyleSheet, View, Animated, useWindowDimensions, Pressable } from 'react-native';
import type { TabBarProps } from 'react-native-tab-view';
import { Colors } from '@/constants/Colors';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";

export const CustomTabBar: React.FC<TabBarProps<any>> = ({ navigationState, jumpTo, position }) => {
    const layout = useWindowDimensions();
    const tabWidth = layout.width / navigationState.routes.length;

    const translateX = position.interpolate({
        inputRange: navigationState.routes.map((_, i) => i),
        outputRange: navigationState.routes.map((_, i) => i * tabWidth),
    });

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
                        <ThemedText style={[styles.tabText, isFocused && styles.activeText]} >
                            {route.title}
                        </ThemedText>
                    </Pressable>
                );
                })}
            </View>

            <Animated.View
                style={[styles.indicator, {width: layout.width / navigationState.routes.length, transform: [{translateX }] }]}
            >
                <Animated.View 
                    style={[styles.indicatorChildren, {width: "75%"}]}
                />
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        paddingBottom: 5
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: "100%",
    },
    tabItem: {
        flex: 1,
        paddingTop: 1,
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
        bottom: 2.5,
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