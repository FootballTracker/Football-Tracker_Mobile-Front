import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from "../../../components/DefaultComponents/ThemedScrollView";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { Colors } from '@/constants/Colors';
import { Select } from '@/components/Select';

export default function League() {
    const { leagueId } = useLocalSearchParams();
    const [contentLoaded, setContentLoaded] = useState(false);
    const [favoritieState, setFavoritieState] = useState(false);
    const [starIcon, setStarIcon] = useState("star-outlined");

    const [selectedSeason, setSelectedSeason] = useState<number>();

    useEffect(() => {
        //fazer requisição para o back
        
        setSelectedSeason(22);
        setContentLoaded(true);
    }, []);


    const changeFavoritie = () => {
        alert("trocar favorito");
        setFavoritieState(!favoritieState);
    }

    const selectSeason = (season: number) => {
        setSelectedSeason(season);
    }

    useEffect(() => {
        favoritieState ? setStarIcon("star") : setStarIcon("star-outlined");
    }, [favoritieState]);

    return (

        contentLoaded ? (
            <ThemedScrollView style={styles.background}>
                <View style={styles.header}>
                    <Image source={{uri: "https://media.api-sports.io/football/leagues/71.png"}} style={styles.leagueImage} resizeMode='contain'/>
                    <ThemedText style={{fontSize: 19, fontFamily: "Kdam"}}>
                        Brasileirão
                    </ThemedText>
                        {/* <ThemedText style={{fontSize: 12, fontFamily: "Kdam"}}>
                            {selectedSeason}
                        </ThemedText>
                        <Picker
                            selectedValue={selectedSeason}
                            onValueChange={(season) =>
                                selectSeason(season)
                            }
                            style={{
                                width: 35
                            }}
                            dropdownIconColor={Colors.dark.DarkerText}
                            prompt='Selecione uma temporada:'
                            mode='dialog'
                            itemStyle={{
                                textAlign: "center",
                                backgroundColor: Colors.dark.LightBackground
                            }}
                        >
                            <Picker.Item label="22" value="22" />
                            <Picker.Item label="23" value="23" />
                        </Picker> */}
                        <Select selected={selectedSeason} setSelected={setSelectedSeason} values={[
                            {
                                name: '22',
                                value: '22'
                            },
                            {
                                name: '23',
                                value: '23'
                            },
                            {
                                name: '24',
                                value: '24'
                            },
                            ]}
                            style={{
                                marginLeft: 6,
                            }}
                            selectFontSize={13}
                            iconSize={19}

                        />
                    <TouchableOpacity onPress={changeFavoritie}>
                        <ThemedIcon
                            IconComponent={Entypo}
                            name={starIcon}
                            darkColor={Colors.dark.Red}
                            lightColor={Colors.light.Red}
                            style={styles.star}
                        />
                    </TouchableOpacity>
                </View>
            </ThemedScrollView>
        ) : (
            <View>
                <ThemedText>Loading</ThemedText>
            </View>
        )

    );
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative"
    },
    leagueImage: {
        width: 55,
        height: 45,
        marginRight: 5
    },
    star: {
        marginTop: -2,
        paddingLeft: 3,
        paddingRight: 3
    },
});