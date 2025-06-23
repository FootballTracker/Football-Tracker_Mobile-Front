import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';
import { Stack } from 'expo-router';
import { PageProvider } from '@/context/PageContext';
import { useItemsContext } from '@/context/ItemsContext';

import TopMenu from '@/components/TopMenu';
import LoadingIcon from '@/components/LoadingIcon';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import Toast from '@/components/Toast';
import { MatchProvider } from '@/context/MatchContext';

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
            <ToastManager config={toastConfig} position="bottom" useModal={false} duration={4000}/>
        </>
    );
}