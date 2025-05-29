//Default Imports
import { ThemedIconProps } from "./DefaultComponents/ThemedIcon"
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Image } from "react-native";
import { SvgUri } from 'react-native-svg';

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
    imageUrl?: string;
}

export default function SingleInfo({icon, infoName, info, StrokeIcon, imageUrl} : SingleInfoProps) {
    const { theme } = useTheme();
    const svg = imageUrl?.endsWith('svg');

    const styles = StyleSheet.create({
        infoBox: {
            borderColor: Colors[theme].Red,
            borderWidth: .5,
            borderRadius: 7,
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 12,
            width: "100%"
        },
        infoGroup: {
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
            <View style={styles.infoGroup}>
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
            
            <View style={styles.infoGroup}>
                {imageUrl && (
                    !svg ? (
                        <Image source={{uri: imageUrl}} resizeMode="contain" style={{width: 22, height: 22}} />
                    ) : (
                        <SvgUri uri={imageUrl} width={22} height={22}/>
                    )
                )}
                <ThemedText style={styles.infoText}>{info}</ThemedText>
            </View>
        </View>
    )
}