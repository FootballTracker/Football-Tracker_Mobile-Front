import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

import { ThemedIcon } from '../DefaultComponents/ThemedIcon';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import FavoriteStar from '../FavoriteStar';

export interface LeagueCardI {
    id: string
    logo_url: string
    name: string
    is_favorite: boolean
    api_id: string
}

export default function LeagueCard({ id, logo_url, name, is_favorite }: LeagueCardI) {

    const accessLeague = () => {
        router.push(`/(pages)/league/${id}` as any);
    }

    const changeFavoritie = () => {
        // alert("trocar favorito");
    }

    return (
        <Pressable onPress={accessLeague}>
            <View style={styles.card}>
                <View style={[styles.sideInfo, styles.leftInfo]}>
                    <Image source={{uri: logo_url}} resizeMode="contain" style={styles.image}/>
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
        // marginTop: 18,
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