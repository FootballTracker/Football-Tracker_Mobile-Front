//Default Imports
import { Animated, Easing, Dimensions, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';

//Icons
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { ThemedView } from './DefaultComponents/ThemedView';

//Type
type LoadingIconProps = {
    darkColor?: keyof typeof Colors.dark,
    lightColor?: keyof typeof Colors.light,
    themed?: boolean,
    size?: number;
}

export default function LoadingIcon({ darkColor = 'Red', lightColor = 'Red', themed = true, size = 35 } : LoadingIconProps) {
    const rotateValue = useRef(new Animated.Value(0)).current;
    const MyView : React.ComponentType<any> = themed ? ThemedView : View;

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
        <MyView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Animated.View style={{ transform: [{rotate}] }} >
                <ThemedIcon IconComponent={AntDesign} name='loading1' darkColor={Colors.dark[darkColor]} lightColor={Colors.light[lightColor]} size={size}/>
            </Animated.View>
        </MyView>
    );
}