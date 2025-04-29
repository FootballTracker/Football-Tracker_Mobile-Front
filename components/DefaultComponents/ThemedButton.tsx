//Default Imports
import { StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

//Type
type ThemedButtonProps = {
    IconComponent?: {Icon: React.ComponentType<any>, name: string, size?: number};
    title?: string;
    handleClick: () => void;
    backgroundColor: keyof typeof Colors.light & keyof typeof Colors.dark
    textColor: keyof typeof Colors.light & keyof typeof Colors.dark
};

export function ThemedButton({ IconComponent, title = 'Continuar', handleClick, backgroundColor, textColor, ...rest }: ThemedButtonProps) {
    const theme = useColorScheme() ?? 'light';
    const windowWidth = Dimensions.get('window').width;

    const styles = StyleSheet.create({
        input: {
            backgroundColor: Colors[theme][backgroundColor],
            width: windowWidth * 0.8,
            borderRadius: 10,
        },
        text: {
            color: Colors[theme][textColor],
            fontSize: 17,
            padding: 10,
            textAlign: 'center',
        },
        icon: {
            color: Colors[theme][textColor],
            position: 'absolute',
            left: 5,
        }
    })

    return (
        <TouchableOpacity onPress={() => {handleClick()}} style={styles.input} {...rest}>
            {IconComponent && (<IconComponent.Icon name={IconComponent.name} size={IconComponent.size ? IconComponent.size : 30} style={styles.icon} />) }
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}