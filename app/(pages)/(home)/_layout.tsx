import { Tabs } from 'expo-router';
import 'react-native-reanimated';

import BottomMenu from '@/components/BottomMenu';

export default function RootLayout() {

    return (
        <>
            <Tabs screenOptions={{
                tabBarStyle: { display: 'none' },
                headerShown: false,
            }}>
                <Tabs.Screen name="index" />
                <Tabs.Screen name="Times" />
                <Tabs.Screen name="Jogadores" />
            </Tabs>

            <BottomMenu />
        </>
    );
}