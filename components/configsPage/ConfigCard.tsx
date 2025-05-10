//Default Imports
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

//Icons
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

//Components
import { ThemedIcon, ThemedIconProps } from "../DefaultComponents/ThemedIcon";
import { ThemedText } from "../DefaultComponents/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme.web";

//Types
type ConfigCardProps = {
    icon: ThemedIconProps;
    text: string;
}

export function ConfigsCard({ icon, text } : ConfigCardProps) {
    const theme = useColorScheme() ?? 'light';

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
        <Pressable style={({ pressed }) => [styles.configurationItem, pressed && styles.configurationItemHover]}>
            <View style={styles.configurationItemName}>
                <ThemedIcon {...icon} darkColor={Colors.dark.Red} lightColor={Colors.light.Red} />
                <ThemedText>{text}</ThemedText>
            </View>
            <ThemedIcon IconComponent={MaterialIcons} name='keyboard-arrow-right' darkColor={Colors.dark.Red} lightColor={Colors.light.Red} />
        </Pressable>
    )
}