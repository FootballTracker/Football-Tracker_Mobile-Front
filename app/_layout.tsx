// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Dimensions, Platform, StatusBar as Status } from 'react-native';
import { Host } from 'react-native-portalize';

import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { StatusBar } from '@/components/home/StatusBar';
import { ItemsProvider } from '@/context/ItemsContext';

import Toast from '@/components/Toast';
import ToastManager from 'toastify-react-native';

const windowHeight = Dimensions.get('window').height;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    const [loaded] = useFonts({
        Karla: require('../assets/fonts/Karla.ttf'),
        Kdam: require('../assets/fonts/Kdam Thmor.ttf'),
        Kokoro: require('../assets/fonts/Kokoro.ttf'),
        Koulen: require('../assets/fonts/Koulen.ttf'),
    });

    useEffect(() => {
        if (Platform.OS === 'android') {
            setStatusBarHeight(Status.currentHeight || 0);
        } else if (Platform.OS === 'ios') {
            const { height } = Dimensions.get('window');
            setStatusBarHeight(height > 800 ? 44 : 20);
        }
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const toastConfig = {
        default: (props: any) => (<Toast {...props.props} visibilityTime={props.duration}/>),
    }

    return (
        <ThemeProvider>
            <UserProvider>
                <ItemsProvider>
                    <Host>
                        <ThemedView  style={{ minHeight: windowHeight, top: statusBarHeight, }} >
                            <Stack screenOptions={{ headerShown: false }} >
                                <Stack.Screen name="(auth)" />
                                <Stack.Screen name="(pages)" />
                            </Stack>

                            <StatusBar />
                            
                            <ToastManager config={toastConfig} position="bottom" useModal={false} duration={4000}/>
                        </ThemedView>
                    </Host>
                </ItemsProvider>
            </UserProvider>
        </ThemeProvider>
    );
}