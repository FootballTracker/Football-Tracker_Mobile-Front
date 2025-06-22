//Default Imports
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

//Components
import { ThemedView } from '@/components/DefaultComponents/ThemedView';

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