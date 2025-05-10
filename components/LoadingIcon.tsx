import { Animated, Easing, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';

import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { ThemedView } from './DefaultComponents/ThemedView';

export default function LoadingIcon() {

    const rotateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ).start();
    }, []);

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <ThemedView style={{
            flex: 1,
            height: Dimensions.get('window').height,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Animated.View
                style={{
                    transform: [{rotate}]
                }}
            >
                <ThemedIcon IconComponent={AntDesign} name='loading1' darkColor={Colors.dark.Red} lightColor={Colors.light.Red} size={35}/>
            </Animated.View>
        </ThemedView>
    );
}