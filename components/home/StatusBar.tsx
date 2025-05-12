import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { usePathname } from 'expo-router';
import { StatusBar as Bar } from 'expo-status-bar';

export function StatusBar() {
    const pathname = usePathname();
    const { theme } = useTheme();

    return (
        <Bar style='auto' backgroundColor={(pathname === '/Login' || pathname === '/Cadastro') ? Colors[theme].LightBackground : Colors[theme].DarkBackground}/>
    )
}