//Default Imports
import { Animated, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import { Toast } from "toastify-react-native";

//Components
import { ThemedIcon } from "./DefaultComponents/ThemedIcon";
import { TouchableOpacity } from "react-native";

//Icons
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg'
import FilledStar from '@/assets/Icons/FilledStar.svg'
import { useUserContext } from "@/context/UserContext";

//Type
type FavoriteStarProps = {
    favorite: boolean;
    handleClick: (() => Promise<boolean>) | (() => void);
}

export default function FavoriteStar({ favorite, handleClick } : FavoriteStarProps) {
    const { logged } = useUserContext();
    const [favoritieState, setFavoritieState] = useState(favorite);
    const translateAnim = useRef(new Animated.Value(0)).current;

    const starAnimation = () => {
        Animated.sequence([
            Animated.timing(translateAnim, {
                toValue: -2,
                duration: 33,
                useNativeDriver: true
            }),
            Animated.timing(translateAnim, {
                toValue: 2,
                duration: 33,
                useNativeDriver: true
            }),
            Animated.timing(translateAnim, {
                toValue: 0,
                duration: 33,
                useNativeDriver: true
            })
        ]).start();
    }

    async function changeIcon() {
        if(logged) {
            const value = await handleClick();
            if(value === undefined) setFavoritieState(!favoritieState);
            else starAnimation();
        }
        else {
            Toast.show({
                props: {
                    type: 'warn',
                    text: 'Faça login para poder favoritar'
                },
                visibilityTime: 6000
            });
            starAnimation();
        }
    }

    return (
        <Animated.View style={{transform: [{translateX: translateAnim}]}}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {changeIcon()}}>
                <ThemedIcon
                    IconComponent={favoritieState ? FilledStar : UnfilledStar}
                    colorName="Red"
                    style={styles.star}
                    width={30}
                    height={22}
                />
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    star: {
        marginTop: -2,
        paddingLeft: 7,
        paddingRight: 7
    }
});