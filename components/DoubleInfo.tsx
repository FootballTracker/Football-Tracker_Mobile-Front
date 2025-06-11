//Default Imports
import { ThemedIconProps } from "./DefaultComponents/ThemedIcon"
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Image } from "react-native";
import { SvgUri } from 'react-native-svg';
import { useState } from "react";

//Components
import { ThemedIcon } from "./DefaultComponents/ThemedIcon";
import { ThemedText } from "./DefaultComponents/ThemedText";
import { View } from "react-native";

//Type
type DoubleInfoProps = {
    infoName: string;
    leftInfo: string | number;
    rightInfo: string | number;
}

export default function DoubleInfo({infoName, leftInfo, rightInfo} : DoubleInfoProps) {
    const [showFullInfo, setShowFullInfo] = useState<boolean>(false);
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            borderColor: Colors[theme].Red,
            borderWidth: .5,
            borderRadius: 7,
            flexDirection: 'row',
            gap: 12,
            paddingVertical: 8,
            paddingHorizontal: 12,
            width: "100%",
            alignItems: 'center',
        },
        text: {
            fontSize: 12,
        },
        infoName: {
            flex: 1,
            textAlign: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <ThemedText style={styles.text}>{leftInfo}</ThemedText>
            <ThemedText style={[styles.infoName, styles.text]}>{infoName}</ThemedText>
            <ThemedText style={styles.text}>{rightInfo}</ThemedText>
        </View>
    )
}