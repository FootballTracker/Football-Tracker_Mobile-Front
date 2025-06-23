//Default Imports
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';

//Components
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import Toast from '@/components/Toast';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const toastConfig = {
        default: (props: any) => (<Toast {...props.props} visibilityTime={props.duration}/>),
    }

    return (
        <>
            <ThemedView style={{flex: 1}}>
                <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' }}} >
                    <Tabs.Screen name="Login" />
                    <Tabs.Screen name="Cadastro" />
                </Tabs>
            </ThemedView>
            <ToastManager config={toastConfig} position="bottom" useModal={false} duration={4000}/>
        </>
        
    );
}