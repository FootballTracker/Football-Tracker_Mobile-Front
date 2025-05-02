import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

import { ThemedIcon } from '../DefaultComponents/ThemedIcon';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

export interface LeagueCardI {
    id: string
    image: string
    name: string
    favoritie?: boolean
}

export default function LeagueCard({ id, image, name, favoritie }: LeagueCardI) {

    const [starIcon, setStarIcon] = useState(favoritie ? "star" : "star-outlined");
    const [favoritieState, setFavoritieState] = useState(favoritie);

    const accessLeague = () => {
        router.push(`/(pages)/league/${id}` as any);
    }

    const changeFavoritie = () => {
        alert("trocar favorito");
        setFavoritieState(!favoritieState);
    }

    useEffect(() => {
        favoritieState ? setStarIcon("star") : setStarIcon("star-outlined");
    }, [favoritieState]);


    return (
        <TouchableOpacity onPress={accessLeague}>
            <View style={styles.card}>
                <View style={[styles.sideInfo, styles.leftInfo]}>
                    <Image source={{uri: image}} resizeMode="contain" style={styles.image}/>
                    <ThemedText numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{name}</ThemedText>
                </View>
                <View style={[styles.sideInfo, styles.rightInfo]}>
                    <TouchableOpacity onPress={changeFavoritie}>
                        <ThemedIcon
                            IconComponent={Entypo}
                            name={starIcon}
                            darkColor={Colors.dark.Red}
                            lightColor={Colors.light.Red}
                            style={styles.star}
                        />
                    </TouchableOpacity>
                        <ThemedIcon
                            IconComponent={MaterialIcons}
                            name='keyboard-arrow-right'
                            darkColor={Colors.dark.Red}
                            lightColor={Colors.light.Red}
                            size={28}
                        />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 18,
        marginLeft: 5,
        marginRight: 5,
    },
    sideInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 15
    },
    leftInfo: {
        flex: 1,
        paddingRight: 10
    },
    rightInfo: {
        marginTop: 0
    },
    text: {
        flex: 1
    },
    star: {
        marginTop: -2,
        paddingLeft: 7,
        paddingRight: 7
    }
});