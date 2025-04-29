import { Stack, Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { usePathname } from 'expo-router';

import TopMenu from '@/components/TopMenu';

export default function RootLayout() {
    const [page, setPage] = useState("Ligas");
    const pathname = usePathname();

    useEffect(() => {
        switch (pathname) {
            case "/":
                setPage("Ligas");
                break;

            case "/Times":
                setPage("Times");
                break;

            case "/Jogadores":
                setPage("Jogadores");
                break;
        
            default:
                break;
        }

    }, [pathname])


    return (
        <>
            <TopMenu text={page}/>

            <Stack screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name='Time'/>
            </Stack>
        </>
    );
}