//Default Imports
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";

//Icons
import { MaterialIcons } from "@expo/vector-icons";

//Components
import { ThemedIcon, ThemedIconProps } from "../DefaultComponents/ThemedIcon";
import { ThemedText } from "../DefaultComponents/ThemedText";

//Types
type ConfigCardProps = {
    icon: ThemedIconProps;
    text: string;
} & PressableProps;

export function ConfigsCard({ icon, text, ...rest } : ConfigCardProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        configurationItem: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
            borderColor: Colors[theme].Red,
            borderWidth: .5,
            borderRadius: 7,
            padding: 13,
        },
        configurationItemHover: {
            backgroundColor: Colors[theme].LighterBackground,
        },
        configurationItemName: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
    })

    return (
        <Pressable style={({ pressed }) => [styles.configurationItem, pressed && styles.configurationItemHover]} {...rest}>
            <View style={styles.configurationItemName}>
                <ThemedIcon {...icon} colorName="Red" />
                <ThemedText>{text}</ThemedText>
            </View>
            <ThemedIcon IconComponent={MaterialIcons} name='keyboard-arrow-right' colorName="Red" />
        </Pressable>
    )
}