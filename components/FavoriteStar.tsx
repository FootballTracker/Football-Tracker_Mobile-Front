//Default Imports
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";

//Components
import { ThemedIcon } from "./DefaultComponents/ThemedIcon";
import { TouchableOpacity } from "react-native";

//Icons
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg'
import FilledStar from '@/assets/Icons/FilledStar.svg'

//Type
type FavoriteStarProps = {
    favorite: boolean;
    swapFavoriteOnClick?: boolean;
    handleClick: (() => Promise<boolean>) | (() => void);
}

export default function FavoriteStar({ favorite, swapFavoriteOnClick = true, handleClick } : FavoriteStarProps) {
    const [favoritieState, setFavoritieState] = useState(favorite);

    async function changeIcon() {
        const value = await handleClick();
        if(value === undefined && swapFavoriteOnClick) setFavoritieState(!favoritieState);
    }

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => {changeIcon()}}>
            <ThemedIcon
                IconComponent={favoritieState ? FilledStar : UnfilledStar}
                colorName="Red"
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