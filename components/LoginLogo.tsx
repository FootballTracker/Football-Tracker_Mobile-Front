//Default Imports
import { StyleSheet, Dimensions, Animated, Keyboard } from "react-native";
import { useEffect, useRef, useState } from "react";

//Components
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedImage } from "./DefaultComponents/ThemedImage";

//Consts
const windowWidth = Dimensions.get('window').width;

export default function LoginLogo() {
    const [imageScale, setImageScale] = useState(1);
    const [imageOpacity, setImageOpacity] = useState(1);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setImageScale(0);
            setImageOpacity(0);
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setImageScale(1);
            setImageOpacity(1);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    Animated.timing(scaleAnim, {
        toValue: imageScale,
        duration: 150,
        useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnim, {
        toValue: imageOpacity,
        duration: 150,
        useNativeDriver: true,
    }).start();

    return (
        // <Animated.View style={{alignItems: 'center', top: -9, transform: [{scale: scaleAnim}], opacity: opacityAnim}}>
        <Animated.View style={{alignItems: 'center', top: -9}}>
            <ThemedText style={[{fontSize: 45, top: 9}, styles.text]}>FOOTBALL</ThemedText>
            <ThemedImage
                source={{
                    light: require("@/assets/images/GreenBlackLogo.png"),
                    dark: require("@/assets/images/GreenWhiteLogo.png"),
                }}
                style={styles.logo}
            />
            <ThemedText style={[{fontSize: 25}, styles.text]}>TRACKER</ThemedText>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    logo: {
        // width: windowWidth * 0.52,
        height: windowWidth * 0.52,
        maxHeight: 300,
        minHeight: 100,
    },
    text: {
        fontFamily: 'Koulen',
    },
});