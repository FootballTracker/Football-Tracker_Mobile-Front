import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getItem, saveItem } from './StorageFunctions';

type theme = 'dark' | 'light';
type selectedTheme = 'dark' | 'light' | 'system';

const saveName = 'theme';

// Context type
interface ThemeContextType {
    theme: theme;
    setTheme: (theme: selectedTheme) => void;
    themes: {
        name: string,
        value: string,
    }[];
    themesNames: {
        dark: string,
        light: string,
        system: string,
    };
    selectedTheme: selectedTheme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider props
interface ThemeProviderProps {
    children: ReactNode;
}


// Provider
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const colorScheme = useColorScheme() ?? 'light';
    const [theme, defineTheme] = useState<theme>('dark');
    const [selectedTheme, defineSelectedTheme] = useState<selectedTheme>('system');

    const themes = [
        {
            name: 'Claro',
            value: 'light',
        },
        {
            name: 'Norturno',
            value: 'dark',
        },
        {
            name: 'Automático',
            value: 'system',
        }
    ]

    const themesNames = {
        light: themes[0].name,
        dark: themes[1].name,
        system: themes[2].name,
    }

    const setTheme = (theme: selectedTheme, keepSelected?: boolean) => {
        if(theme === 'system') defineTheme(colorScheme);
        else defineTheme(theme);

        !keepSelected && defineSelectedTheme(theme);
        saveItem(saveName, theme);
    }



    useEffect(() => {
        getItem(saveName).then((storedTheme) => {
            if(storedTheme) {
                const themeconfig : any = storedTheme;
                setTheme(themeconfig);
                defineSelectedTheme(themeconfig);
            } else {
                setTheme('system');
            }
        })
    }, [])



    useEffect(() => {
        setTheme(colorScheme, true);
    }, [colorScheme])



    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes, themesNames, selectedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};



// Hook personalizado para acessar o contexto
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return context;
};