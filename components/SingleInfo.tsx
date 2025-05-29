//Default Imports
import { ThemedIconProps } from "./DefaultComponents/ThemedIcon"
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

//Components
import { ThemedIcon } from "./DefaultComponents/ThemedIcon";
import { ThemedText } from "./DefaultComponents/ThemedText";
import { View } from "react-native";

//Type
type SingleInfoProps = {
    icon?: ThemedIconProps;
    infoName: string;
    info: string;
    StrokeIcon?: React.ComponentType<any>;
}

export default function SingleInfo({icon, infoName, info, StrokeIcon} : SingleInfoProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        infoBox: {
            borderColor: Colors[theme].Red,
            borderWidth: .5,
            borderRadius: 7,
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 12,
            width: '95%',
        },
        infoName: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        infoText: {
            fontFamily: 'Kdam',
            fontSize: 12,
        }
    });

    return (
        <View style={styles.infoBox}>
            <View style={styles.infoName}>
                {icon ? (
                    <ThemedIcon width={18} height={18} {...icon} darkColor={Colors.dark.Red} lightColor={Colors.light.Red} />
                ) : (
                    StrokeIcon ? (
                        <StrokeIcon width={18} height={18} stroke={Colors[theme].Red} strokeWidth={3} />
                    ) : (
                        <ThemedText darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.infoText}>•</ThemedText>
                    )
                )}
                <ThemedText style={styles.infoText}>{infoName}</ThemedText>
            </View>

            <ThemedText style={styles.infoText}>{info}</ThemedText>
        </View>
    )
}