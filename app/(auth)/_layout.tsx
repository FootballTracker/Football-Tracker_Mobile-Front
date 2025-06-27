//Default Imports
import { Animated, Dimensions, Keyboard, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Stack, usePathname } from 'expo-router';
import { KeyboardEvent } from 'react-native';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { ReturnArrow } from '@/components/ReturnArrow';
import LoginLogo from '@/components/LoginLogo';
import { View } from 'react-native';
import { Select } from '@/components/Select';
import { useTheme } from '@/context/ThemeContext';
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Consts
const windowHeight = Dimensions.get('window').height;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const translateAnim = useRef(new Animated.Value(0)).current;
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const { themesNames, selectedTheme, setTheme, themes } = useTheme();
    const [ modalOpened, setModalOpened ] = useState(false);
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

    return (
        <>
            <ThemedView style={{position: 'absolute', width: '100%', height: '100%'}} />

            <Animated.View style={{transform: [{translateY: translateAnim}]}}>
                <ThemedScrollView keyboardShouldPersistTaps="handled" style={styles.container} contentContainerStyle={styles.content}>
                    <ReturnArrow style={{position: 'absolute', top: -5}} />

                    <ThemedIcon onPress={() => {setModalOpened(true)}} IconComponent={MaterialCommunityIcons} name='theme-light-dark' style={styles.themeIcon} />
                    <Select modalOpened={modalOpened} setModalOpened={setModalOpened} setSelected={setTheme} title={`Selecione o tema desejado:\nTema atual: ${themesNames[selectedTheme]}`} values={themes} />

                    <LoginLogo />

                    <View style={{height: pathname.split('/').at(-1) === 'Login' ? 340 : 385}}>
                        <Stack screenOptions={{headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: 'fade'}} />
                    </View>
                </ThemedScrollView>
            </Animated.View>
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
    },
    themeIcon: {
        position: 'absolute',
        top: -5,
        right: 0,
        paddingVertical: 5,
        paddingHorizontal: 15,
    }
});