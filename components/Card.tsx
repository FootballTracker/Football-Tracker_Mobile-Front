//Default Imports
import { StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { Colors } from "@/constants/Colors";
import { SvgUri } from 'react-native-svg';
import { useEffect, useRef, useState } from "react";

//Components
import { ThemedIcon } from "./DefaultComponents/ThemedIcon";
import { ThemedText } from "./DefaultComponents/ThemedText";
import { View } from "react-native";
import FavoriteStar from "./FavoriteStar";

//Icons
import { MaterialIcons } from "@expo/vector-icons";

//Type
type SingleInfoProps = {
    image?: string;
    info: string;
    favorite?: boolean;
    handleOpen: () => void;
    handleFavorite?: () => void;
    show?: boolean;
}

export default function Card({image, info, favorite, handleOpen, handleFavorite, show = true} : SingleInfoProps) {
    const svg = image?.endsWith('svg');
    const [visible, setVisible] = useState(show);

    const defaultFadeValue : number = 1;
    const hiddenFadeValue : number = 0;
    const defaultHeightValue : number = 40;
    const hiddenHeightValue : number = 0;
    const defaultTranslateValue : number = 0;
    const hiddenTranslateValue : number = 20;

    const fadeAnim = useRef(new Animated.Value(hiddenFadeValue)).current;
    const heightAnim = useRef(new Animated.Value(hiddenHeightValue)).current;
    const translateAnim = useRef(new Animated.Value(hiddenTranslateValue)).current;

    useEffect(() => {
        if(show) {
            setVisible(true);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: defaultFadeValue,
                    duration: 100,
                    useNativeDriver: false
                }),
                Animated.timing(heightAnim, {
                    toValue: defaultHeightValue,
                    duration: 100,
                    useNativeDriver: false
                }),
                Animated.timing(translateAnim, {
                    toValue: defaultTranslateValue,
                    duration: 100,
                    useNativeDriver: false
                })
            ]).start();
        }
        else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: hiddenFadeValue,
                    duration: 100,
                    useNativeDriver: false
                }),
                Animated.timing(heightAnim, {
                    toValue: hiddenHeightValue,
                    duration: 100,
                    useNativeDriver: false
                }),
                Animated.timing(translateAnim, {
                    toValue: hiddenTranslateValue,
                    duration: 100,
                    useNativeDriver: false
                })
            ]).start(() => { setVisible(false) });
        }
    }, [show]);

    if (!visible) return null;

    const styles = StyleSheet.create({
        infoBox: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: "100%",
            marginBottom: 4,
        },
        image: {
            borderRadius: 5,
            width: 35,
            height: 35,
        },
        infoGroup: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        leftGroup: {
            gap: 13,
            flex: 1,
        },
        infoText: {
            // width: '70%',
            flex: 1,
            fontFamily: 'Kdam',
            fontSize: 14,
        }
    });

    return (
        <Animated.View style={{ opacity: fadeAnim, transform: [{translateX: translateAnim}], height: heightAnim }}>
            <TouchableOpacity style={styles.infoBox} activeOpacity={1} onPress={handleOpen} >
                <View style={[styles.infoGroup, styles.leftGroup]}>
                    {image && (
                        !svg ? (
                            <Image source={{uri: image}} resizeMode="contain" style={styles.image} />
                        ) : (
                            <SvgUri uri={image} width={35} height={35}/>
                        )
                    )}
                    <ThemedText numberOfLines={1} ellipsizeMode='tail' style={styles.infoText}>{info}</ThemedText>
                </View>
                
                <View style={styles.infoGroup}>
                    { favorite !== undefined && handleFavorite && <FavoriteStar favorite={favorite} handleClick={() => {handleFavorite()}} /> }
                    <ThemedIcon onPress={handleOpen} IconComponent={MaterialIcons} name='keyboard-arrow-right' darkColor={Colors.dark.Red} lightColor={Colors.light.Red} size={25} />
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}