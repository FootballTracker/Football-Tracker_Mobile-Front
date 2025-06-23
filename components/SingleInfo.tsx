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
type SingleInfoProps = {
    icon?: ThemedIconProps;
    infoName: string;
    info: string;
    imageUrl?: string;
}

export default function SingleInfo({icon, infoName, info, imageUrl} : SingleInfoProps) {
    const [showFullInfo, setShowFullInfo] = useState<boolean>(false);
    const { theme } = useTheme();
    const svg = imageUrl?.endsWith('svg');

    const styles = StyleSheet.create({
        container: {
            borderColor: Colors[theme].Red,
            borderWidth: .5,
            borderRadius: 7,
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 12,
            width: "100%",
            justifyContent: "space-between",
        },
        infoGroup: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        infoText: {
            fontFamily: 'Kdam',
            fontSize: 12,
            textAlign: 'right',
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.infoGroup}>
                {icon ? (
                    <ThemedIcon width={18} height={18} {...icon} colorName="Red" />
                ) : (
                    <ThemedText colorName="Red" style={styles.infoText}>•</ThemedText>
                )}
                <ThemedText style={styles.infoText}>{infoName}</ThemedText>
            </View>
            
            <View style={[styles.infoGroup, {flex: 1, justifyContent: 'flex-end'}]}>
                {imageUrl && (
                    !svg ? (
                        <Image source={{uri: imageUrl}} resizeMode="contain" style={{width: 22, height: 22}} />
                    ) : (
                        <SvgUri uri={imageUrl} width={22} height={22}/>
                    )
                )}
                {showFullInfo ? (
                    <ThemedText style={[styles.infoText]} onPress={() => {setShowFullInfo(!showFullInfo)}}>{info}</ThemedText>
                ) : (
                    <ThemedText numberOfLines={1} ellipsizeMode='tail' style={[styles.infoText]} onPress={() => {setShowFullInfo(!showFullInfo)}}>{info}</ThemedText>
                )}
            </View>
        </View>
    )
}