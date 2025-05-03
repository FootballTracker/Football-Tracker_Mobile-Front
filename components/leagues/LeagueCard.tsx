import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg'

import { ThemedIcon } from '../DefaultComponents/ThemedIcon';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { router } from 'expo-router';

export interface LeagueCardI {
    id: string
    image: string
    name: string
    favoritie?: boolean
}

export default function LeagueCard({ id, image, name, favoritie }: LeagueCardI) {
    const [favoritieState, setFavoritieState] = useState(favoritie);

    const accessLeague = () => {
        router.push(`/(pages)/${id}` as any);
    }

    const changeFavoritie = () => {
        // alert("trocar favorito");
        setFavoritieState(!favoritieState);
    }

    return (
        <Pressable onPress={accessLeague}>
            <View style={styles.card}>
                <View style={[styles.sideInfo, styles.leftInfo]}>
                    <Image source={{uri: image}} resizeMode="contain" style={styles.image}/>
                    <ThemedText numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{name}</ThemedText>
                </View>
                <View style={[styles.sideInfo, styles.rightInfo]}>
                    <TouchableOpacity onPress={changeFavoritie}>
                        <ThemedIcon
                            IconComponent={favoritieState ? FilledStar : UnfilledStar}
                            darkColor={Colors.dark.Red}
                            lightColor={Colors.light.Red}
                            style={styles.star}
                            width={30}
                            height={22}
                        />
                    </TouchableOpacity>
                        <ThemedIcon
                            IconComponent={MaterialIcons}
                            name='keyboard-arrow-right'
                            darkColor={Colors.dark.Red}
                            lightColor={Colors.light.Red}
                            size={25}
                        />
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 18,
        marginHorizontal: 5,
    },
    sideInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 37,
        height: 37,
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
        fontFamily: 'Kdam',
        fontSize: 15,
        flex: 1
    },
    star: {
        marginTop: -2,
        paddingLeft: 7,
        paddingRight: 7
    }
});