//Default Imports
import { StyleSheet, TouchableOpacity, Dimensions, Text, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import { StyleProps } from 'react-native-reanimated';
import { useState } from 'react';

//Components
import LoadingIcon from '../LoadingIcon';

//Type
export type ThemedButtonProps = {
    IconComponent?: {Icon: React.ComponentType<any>, name: string, size?: number};
    title?: string;
    handleClick: () => void;
    backgroundLightcolor?: string;
    backgroundDarkcolor?: string;
    backgroundMidnightcolor?: string;
    backgroundColor?: keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.midnight
    textColor: keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.midnight
    style?: StyleProps
};

export function ThemedButton({ IconComponent, title = 'Continuar', handleClick, backgroundLightcolor, backgroundDarkcolor, backgroundMidnightcolor, backgroundColor = 'Green', textColor, style, ...rest }: ThemedButtonProps) {
    const { theme } = useTheme();
    const size = IconComponent ? (IconComponent.size ? IconComponent.size : 30) : 0;
    const background = useThemeColor({light: backgroundLightcolor, dark: backgroundDarkcolor, midnight: backgroundMidnightcolor}, backgroundColor)

    const [loading, setLoading] = useState<boolean>(false);

    const styles = StyleSheet.create({
        input: {
            backgroundColor: background,
            paddingVertical: 3,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            height: 45,
        },
        text: {
            color: Colors[theme][textColor],
            fontSize: 17,
            fontFamily: 'Kokoro',
            padding: 10,
            textAlign: 'center',
            width: '100%',
            textAlignVertical: 'center',
            right: size,
        },
        icon: {
            color: Colors[theme][textColor],
            left: 7,
            marginTop: 'auto',
            marginBottom: 'auto',
        }
    })

    const handleSubmit = async () => {
        setLoading(true);
        await handleClick();
        setLoading(false);
    }

    return (
        <>
            {loading ? (
                <TouchableOpacity disabled={true} activeOpacity={0.5} style={[styles.input, style, {paddingVertical: 7}]} {...rest}>
                    <LoadingIcon darkColor={'LightBackground'} lightColor={'LightBackground'} themed={false} size={size} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.5} style={[styles.input, style]} {...rest}>
                    {IconComponent && (<IconComponent.Icon name={IconComponent.name} size={size} style={styles.icon} />)}
                    <Text style={styles.text}>{title}</Text>
                </TouchableOpacity>
            )}
        </>
    )
}