import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { PageProvider } from '@/context/PageContext';
import { useItemsContext } from '@/context/ItemsContext';

import TopMenu from '@/components/TopMenu';
import LoadingIcon from '@/components/LoadingIcon';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { MatchProvider } from '@/context/MatchContext';

export default function RootLayout() {
    const { loading } = useItemsContext();

    return (
        <ThemedView style={{flex: 1}}>
            {!loading ?
                (
                    <PageProvider>
                        <MatchProvider>
                            <TopMenu/>

                            <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
                        </MatchProvider>
                    </PageProvider>
                ) : (
                    <LoadingIcon />
                )
            }
        </ThemedView>
    );
}