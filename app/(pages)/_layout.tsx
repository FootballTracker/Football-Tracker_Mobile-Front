import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';
import { Stack } from 'expo-router';
import { PageProvider } from '@/context/PageContext';
import { useItemsContext } from '@/context/ItemsContext';

import TopMenu from '@/components/TopMenu';
import LoadingIcon from '@/components/LoadingIcon';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import Toast from '@/components/Toast';

export default function RootLayout() {
    const { loading } = useItemsContext();

    const toastConfig = {
        default: (props: any) => (<Toast {...props.props} visibilityTime={props.duration}/>),
    }

    return (
        <>
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
            <ToastManager config={toastConfig} position="bottom" useModal={false} duration={4000}/>
        </>
    );
}