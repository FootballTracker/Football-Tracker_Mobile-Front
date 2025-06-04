import { StyleSheet, View, Animated, useWindowDimensions, LayoutChangeEvent, Pressable, Dimensions } from 'react-native';
import type { TabBarProps } from 'react-native-tab-view';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import { useEffect, useRef } from 'react';
import Boot from '@/assets/Icons/Boot.svg';
import Shield from '@/assets/Icons/Shield.svg';
import Trophy from '@/assets/Icons/Trophy.svg';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from '../DefaultComponents/ThemedView';

const windowWidth = Dimensions.get('window').width;

export const Menu: React.FC<TabBarProps<any>> = ({ navigationState, jumpTo }) => {
    const layout = useWindowDimensions();
    const totalTabs = navigationState.routes.length;
    const { theme } = useTheme();

    const indicatorTranslateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const currentIndex = navigationState.index;
        const baseX = (layout.width / totalTabs) * currentIndex;

        Animated.timing(indicatorTranslateX, {
            toValue: baseX,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [navigationState.index, layout.width]);


    const styles = StyleSheet.create({
        wrapper: {
            position: 'relative',
        },
        tabBar: {
            flexDirection: 'row',
            justifyContent: "space-evenly",
            width: windowWidth+2,
            paddingVertical: 18,
            left: -1,
            bottom: -1,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderWidth: 0.5,
            borderColor: Colors[theme].Red
        },
        tabItem: {
            flex: 1,
            alignItems: 'center',
            zIndex: 2
        },
        activeTab: {
        
        },
        tabText: {
            color: Colors[theme].DarkerText,
            fontFamily: "Kokoro",
            fontSize: 16,
            lineHeight: 16,
            top: 12
        },
        activeText: {
            color: Colors[theme].Red,
            paddingLeft: 4,
            paddingRight: 4,
            paddingBottom: 4
        },
        indicator: {
            position: 'absolute',
            top: 17,
        },
        indicatorChildren: {
            height: 35,
            width: 65,
            backgroundColor: Colors[theme].Red,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 10
        }
    });

    return (
        <View style={styles.wrapper}>
            <ThemedView style={styles.tabBar} colorName='DarkBackground'>
                    {navigationState.routes.map((route, index) => {
                    const isFocused = navigationState.index === index;
            
                    return (
                        <Pressable
                            key={route.key}
                            style={[styles.tabItem, isFocused && styles.activeTab]}
                            onPress={() => jumpTo(route.key)}
                        >
                            {index === 0 ? (
                                <Shield stroke={isFocused ? Colors[theme].DarkBackground : Colors[theme].DarkerText} strokeWidth={5} width={60} height={30} />
                            ) : index === 1 ? (
                                <Trophy fill={isFocused ? Colors[theme].DarkBackground : Colors[theme].DarkerText} width={60} height={30} />
                            ) : (
                                <Boot fill={isFocused ? Colors[theme].DarkBackground : Colors[theme].DarkerText} width={60} height={30} />
                            )}

                            <ThemedText style={[styles.tabText, isFocused && styles.activeText]}>
                                {route.title}
                            </ThemedText>
                        </Pressable>
                    );
                })}
            </ThemedView>

            <Animated.View
                style={[styles.indicator, {width: layout.width / navigationState.routes.length, transform: [{translateX: indicatorTranslateX }] }]}
            >
                <Animated.View 
                    style={[styles.indicatorChildren]}
                />
            </Animated.View>

        </View>
    );
};