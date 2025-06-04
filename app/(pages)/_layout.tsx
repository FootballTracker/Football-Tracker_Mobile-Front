import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { PageProvider } from '@/context/PageContext';
import LoadingIcon from '@/components/LoadingIcon';

import TopMenu from '@/components/TopMenu';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { useItemsContext } from '@/context/ItemsContext';

export default function RootLayout() {
    const { loading } = useItemsContext();

    return (
        <ThemedView style={{flex: 1}}>
            {!loading ?
                (
                    <PageProvider>
                        <TopMenu/>

                        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
                            <Stack.Screen name="index" />
                            <Stack.Screen name="league/[leagueId]" />
                            <Stack.Screen name="team/[teamId]" />
                            <Stack.Screen name="match/[matchId]" />
                            <Stack.Screen name="Profile" />
                            <Stack.Screen name="userConfigurations/Configurations" />
                            <Stack.Screen name="userConfigurations/UserConfigs" />
                            <Stack.Screen name="userConfigurations/DeleteUser" />
                            <Stack.Screen name="userConfigurations/UpdateUsername" />
                            <Stack.Screen name="userConfigurations/UpdateEmail" />
                            <Stack.Screen name="userConfigurations/UpdatePassword" />
                        </Stack>
                    </PageProvider>
                ) : (
                    <LoadingIcon />
                )
            }
        </ThemedView>
    );
}