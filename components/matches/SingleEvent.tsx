//Default Imports
import { Event } from "./pageComponents/MatchEvents";
import { StyleSheet, ViewProps } from "react-native";
import { router } from "expo-router";

//Components
import { ThemedIcon } from "../DefaultComponents/ThemedIcon";
import { ThemedText } from "../DefaultComponents/ThemedText";
import { View } from "react-native";

//Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Replace from '@/assets/Icons/Replace.svg';

export function SingleEvent({ player, assist, type, detail, comments, reverse=false } : Event & { reverse?: boolean }) {
    const accessPlayer = (id: string | null) => {
        id != null && router.push(`/(pages)/player/${id}` as any);;
    }

    if(type == 'Goal') {
        return (
            <View style={[styles.eventBox, reverse && {alignItems: 'flex-end'}]}>
                <View style={[styles.itemText, reverse && {flexDirection: 'row-reverse'}]}>
                    <ThemedText style={[styles.text, styles.title]} colorName="Green" onPress={() => {accessPlayer(player.id)}}>Gol de {player.name}</ThemedText>
                    <ThemedIcon IconComponent={Ionicons} name="football-outline" size={21} colorName="Green" style={!reverse && {transform: [{scaleX: -1}]}}/>
                </View>

                {assist.name != null && <ThemedText style={styles.text} colorName="DarkerText" onPress={() => {accessPlayer(assist.id)}}>Assistência: {assist.name}</ThemedText>}
                {detail == 'Own Goal' && <ThemedText style={styles.text} colorName="DarkerText">Gol Contra</ThemedText>}
                {comments == 'Penalty' && <ThemedText style={styles.text} colorName="DarkerText">Pênalti</ThemedText>}
            </View>
        )
    }

    if(type == 'Card') {
        const color = detail.split(' ')[0];
        const cardColor = color == 'Red' ? 'Red' : 'Yellow';
        const iconName = reverse ? 'subdirectory-arrow-left' : 'subdirectory-arrow-right';

        return (
            <View style={[styles.eventBox, reverse && {alignItems: 'flex-end'}]}>
                <View style={[styles.itemText, reverse && {flexDirection: 'row-reverse'}]}>
                    <ThemedText style={[styles.text, styles.title]} colorName={cardColor} >Cartão {color == "Red" ? "Vermelho" : "Amarelo"}</ThemedText>
                    <ThemedIcon IconComponent={MaterialCommunityIcons} name="cards-playing-outline" size={21} colorName={cardColor} style={!reverse && {transform: [{scaleX: -1}]}}/>
                </View>

                <ThemedText style={[styles.text, {bottom: -2}]} colorName="DarkerText" onPress={() => {accessPlayer(player.id)}}>Para: {player.name}</ThemedText>
                {comments != null && <ThemedText style={[styles.text, {bottom: -2}, reverse && {textAlign: 'right'}]} colorName="DarkerText" >Por: {comments}</ThemedText>}
            </View>
        )
    }

    if(type == 'Subst') {
        return (
            <View style={[styles.eventBox, reverse && {alignItems: 'flex-end'}]}>
                <View style={[styles.itemText, {gap: 4}, reverse && {flexDirection: 'row-reverse'}]}>
                    <ThemedText style={[styles.text, styles.title]}>Substituição {detail.at(-1)}</ThemedText>
                    <ThemedIcon IconComponent={Replace} width={17} height={17} style={!reverse && {transform: [{scaleX: -1}]}}/>
                </View> 

                <ThemedText style={styles.text} colorName="DarkerText" onPress={() => {accessPlayer(player.id)}}>Sai: {player.name}</ThemedText>
                {assist.name != null && <ThemedText style={styles.text} onPress={() => {accessPlayer(assist.id)}} colorName="DarkerText" >Entra: {assist.name}</ThemedText>}
            </View>
        )
    }

    if(type == 'Var') {
        return (
            <View style={[styles.eventBox, reverse && {alignItems: 'flex-end'}]}>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    eventBox: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    itemText: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 12,
    },
})