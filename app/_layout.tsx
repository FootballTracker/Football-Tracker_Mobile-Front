import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Dimensions, Platform, StatusBar as Status, View } from 'react-native';
import { Host } from 'react-native-portalize';
import { usePathname } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { themedColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { UserProvider } from '@/context/UserContext';

const windowHeight = Dimensions.get('window').height;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const pathname = usePathname();

    const colorScheme = useColorScheme() ?? 'light';
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

    return (
        <UserProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Host>
                    <ThemedView  style={{ minHeight: windowHeight, top: statusBarHeight, }} >
                        <Stack screenOptions={{ headerShown: false }} >
                            <Stack.Screen name="(auth)" />
                        </Stack>

                        <StatusBar style='auto' backgroundColor={(pathname === '/Login' || pathname === '/Cadastro') ? Colors[colorScheme].LightBackground : Colors[colorScheme].DarkBackground}/>

                    </ThemedView>
                </Host>
            </ThemeProvider>
        </UserProvider>
    );
}