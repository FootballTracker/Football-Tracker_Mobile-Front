//Default Imports
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { useState } from "react";

//Components
import { ThemedIcon } from "./DefaultComponents/ThemedIcon";
import { TouchableOpacity } from "react-native";

//Icons
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg'
import FilledStar from '@/assets/Icons/FilledStar.svg'

//Type
type FavoriteStarProps = {
    favorite: boolean;
    handleClick: () => void;
}

export default function FavoriteStar({ favorite, handleClick } : FavoriteStarProps) {
    const [favoritieState, setFavoritieState] = useState(favorite);

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => {setFavoritieState(!favoritieState); handleClick()}}>
            <ThemedIcon
                IconComponent={favoritieState ? FilledStar : UnfilledStar}
                darkColor={Colors.dark.Red}
                lightColor={Colors.light.Red}
                style={styles.star}
                width={30}
                height={22}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    star: {
        marginTop: -2,
        paddingLeft: 7,
        paddingRight: 7
    }
});