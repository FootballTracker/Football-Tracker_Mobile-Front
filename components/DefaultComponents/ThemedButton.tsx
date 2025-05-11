//Default Imports
import { StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import { StyleProps } from 'react-native-reanimated';

//Type
export type ThemedButtonProps = {
    IconComponent?: {Icon: React.ComponentType<any>, name: string, size?: number};
    title?: string;
    handleClick: () => void;
    backgroundColor: keyof typeof Colors.light & keyof typeof Colors.dark
    textColor: keyof typeof Colors.light & keyof typeof Colors.dark
    style?: StyleProps
};

export function ThemedButton({ IconComponent, title = 'Continuar', handleClick, backgroundColor, textColor, style, ...rest }: ThemedButtonProps) {
    const { theme } = useTheme();
    const windowWidth = Dimensions.get('window').width;
    const size = IconComponent ? (IconComponent.size ? IconComponent.size : 30) : 0;

    const styles = StyleSheet.create({
        input: {
            backgroundColor: Colors[theme][backgroundColor],
            // width: '80%',
            paddingVertical: 3,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'center',
            // alignItems: 'center',
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

    return (
        <TouchableOpacity onPress={handleClick} style={[styles.input, style]} {...rest}>
            {IconComponent && (<IconComponent.Icon name={IconComponent.name} size={size} style={styles.icon} />) }
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}