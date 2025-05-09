import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { PageProvider } from '@/context/PageContext';

import TopMenu from '@/components/TopMenu';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';

export default function RootLayout() {
    return (
        <ThemedView style={{flex: 1}}>
            <PageProvider>
                <TopMenu/>

                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="league/[leagueId]" />
                    <Stack.Screen name="team/[teamId]" />
                    <Stack.Screen name="match/[matchId]" />
                    <Stack.Screen name="Time" />
                    <Stack.Screen name="Perfil" />
                </Stack>
            </PageProvider>
        </ThemedView>
    );
}