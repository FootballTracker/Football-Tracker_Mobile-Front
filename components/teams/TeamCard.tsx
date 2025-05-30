import { Image, Pressable, StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

import { ThemedIcon } from '../DefaultComponents/ThemedIcon';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import FavoriteStar from '../FavoriteStar';

export interface TeamCardI {
    id: string
    name: string
    logo: string
    is_favorite: boolean
}

export default function TeamCard({ id, name, logo, is_favorite }: TeamCardI) {

    const accessTeam = () => {
        router.push(`/(pages)/team/${id}` as any);
    }

    const changeFavoritie = () => {
        // alert("trocar favorito");
    }

    return (
        <Pressable onPress={accessTeam}>
            <View style={styles.card}>
                <View style={[styles.sideInfo, styles.leftInfo]}>
                    <Image source={{uri: logo}} resizeMode="contain" style={styles.image}/>
                    <ThemedText numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{name}</ThemedText>
                </View>
                <View style={[styles.sideInfo, styles.rightInfo]}>
                    <FavoriteStar favorite={is_favorite} handleClick={changeFavoritie} />
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
        width: "100%"
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
});