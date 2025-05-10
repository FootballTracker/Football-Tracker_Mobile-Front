//Default Imports
import { Tabs } from 'expo-router';
import { StyleSheet, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

//Components
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import LoginLogo from '@/components/LoginLogo';

//Consts
const windowHeight = Dimensions.get('window').height;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    return (
        <ThemedView style={{flex: 1}}>
            <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' }}} >
                <Tabs.Screen name="Login" />
                <Tabs.Screen name="Cadastro" />
            </Tabs>
        </ThemedView>
    );
}