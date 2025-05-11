import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePathname } from 'expo-router';
import { StatusBar as Bar } from 'expo-status-bar';

export function StatusBar() {
    const pathname = usePathname();
    const { theme } = useColorScheme();

    return (
        <Bar style='auto' backgroundColor={(pathname === '/Login' || pathname === '/Cadastro') ? Colors[theme].LightBackground : Colors[theme].DarkBackground}/>
    )
}