//Default Imports
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';

//Components
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import Toast from '@/components/Toast';
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { Animated, Dimensions, Keyboard, StyleSheet, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { KeyboardEvent } from 'react-native';
import { ReturnArrow } from '@/components/ReturnArrow';
import LoginLogo from '@/components/LoginLogo';
import { Stack, usePathname } from 'expo-router';

//Consts
const windowHeight = Dimensions.get('window').height;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const translateAnim = useRef(new Animated.Value(0)).current;
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', (event: KeyboardEvent) => {
            setKeyboardHeight(event.endCoordinates.height);
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    Animated.timing(translateAnim, {
        toValue: -keyboardHeight,
        duration: 150,
        useNativeDriver: true,
    }).start();

    const toastConfig = {
        default: (props: any) => (<Toast {...props.props} visibilityTime={props.duration}/>),
    }

    return (
        <>
            <ThemedView style={{position: 'absolute', width: '100%', height: '100%'}} />

            <Animated.View style={{transform: [{translateY: translateAnim}]}}>
                <ThemedScrollView keyboardShouldPersistTaps="handled" style={styles.container} contentContainerStyle={styles.content}>
                    <ReturnArrow style={{position: 'absolute', top: -5, zIndex: 1}} />

                    <LoginLogo />

                    <View style={{height: pathname.split('/').at(-1) === 'Login' ? 340 : 385}}>
                        <Stack screenOptions={{headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: 'fade'}} />
                    </View>
                </ThemedScrollView>
            </Animated.View>

            <ToastManager config={toastConfig} position="bottom" useModal={false} duration={4000}/>
        </>
        
    );
}

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        paddingVertical: 20,
    },
    content: {
        height: windowHeight - 40,
        display: 'flex',
        justifyContent: 'space-evenly',
    }
});