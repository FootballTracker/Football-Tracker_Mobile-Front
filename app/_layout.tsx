import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet, Dimensions, Platform, StatusBar as Status, View } from 'react-native';
import { usePathname } from 'expo-router';

import BottomMenu from '@/components/BottomMenu';
import TopMenu from '@/components/TopMenu';
import { Colors } from '@/constants/Colors';
import { themedColor } from '@/hooks/useThemeColor';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const windowHeight = Dimensions.get('window').height;

export default function RootLayout() {
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const [page, setPage] = useState("Ligas");
    const pathname = usePathname();

    const colorScheme = useColorScheme() ?? 'light';
    const [loaded] = useFonts({
        Karla: require('../assets/fonts/Karla.ttf'),
        Kdam: require('../assets/fonts/Kdam Thmor Pro.ttf'),
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

    const showBottomMenu = () => {
        return (pathname === "/" || pathname === "/Jogadores" || pathname === "/Times")
    }

    return (

        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <View 
                style={{
                minHeight: windowHeight,
                top: statusBarHeight
                }}
            >
                {pathname !== "/Login" && <TopMenu text={page} image={true}/> }

                <Tabs screenOptions={{
                    tabBarStyle: { display: 'none' },
                }}>
                    <Tabs.Screen name="index" options={{ headerShown: false }}/>
                    <Tabs.Screen name="Times" options={{ headerShown: false }}/>
                    <Tabs.Screen name="Jogadores" options={{ headerShown: false }}/>
                    <Tabs.Screen name="Login" options={{ headerShown: false }}/>
                </Tabs>

                <StatusBar style='auto' backgroundColor={pathname === "/Login" ? themedColor('LightBackground') : themedColor('DarkBackground')}/>

            {showBottomMenu() && <BottomMenu setText={setPage}/> }

            </View>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    background: {
      position: "fixed",
      minHeight: windowHeight
    }
});