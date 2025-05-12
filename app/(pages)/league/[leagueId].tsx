import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { TabView } from 'react-native-tab-view';
import FilledStar from '@/assets/Icons/FilledStar.svg';
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg';
import api from '@/lib/Axios';
import { useUserContext } from '@/context/UserContext';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { LeagueSelect } from '@/components/LeagueSelect';
import LoadingIcon from '@/components/LoadingIcon';

//scenes to render
import LigaPartidas from '../../../components/leagues/pagesComponents/LigaPartidas';
import LigaClassificacao from '../../../components/leagues/pagesComponents/LigaClassificacao';
import LigaRankings from '../../../components/leagues/pagesComponents/LigaRankings';
import { LeagueCardI } from '@/components/leagues/LeagueCard';

interface LeagueFull {
    league: LeagueCardI
    seasons: number[]
}

export default function League() {
    const { leagueId } = useLocalSearchParams();
    const { user } = useUserContext();
    const [contentLoaded, setContentLoaded] = useState(false);
    const [favoritieState, setFavoritieState] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState<number>(-1);
    const [index, setIndex] = useState(0); //initial route index
    const [league, setLeague] = useState<LeagueFull>();
    
    //routes to render
    const [routes] = useState([
        { key: 'partidas', title: 'Partidas' },
        { key: 'classificacao', title: 'Classificação' },
        { key: 'rankings', title: 'Rankings' },
    ]);

    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case 'partidas':
                return <LigaPartidas leagueId={Number(leagueId)} season={selectedSeason}/>;
            case 'classificacao':
                return <LigaClassificacao leagueId={leagueId} season={selectedSeason}/>;
            case 'rankings':
                return <LigaRankings leagueId={leagueId} season={selectedSeason}/>;
            default:
                return null;
        }
    };

    //search league info and seasons available
    useEffect(() => {
        getLeague();
    }, []);

    useEffect(() => {
        if(league) {
            setSelectedSeason(league.seasons[0]);
            setFavoritieState(league.league.is_favorite);
        }
    }, [league]);

    async function getLeague() {
        await api.get('league', {
            params: {
                user_id: user?.user_id,
                league_id: Number(leagueId)
            }}
        ).then((response: any) => {
            setLeague(response.data);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar liga.');
        }).finally(() => {
            setContentLoaded(true);
        });
    }

    const changeFavoritie = () => {
        // alert("trocar favorito");
        setFavoritieState(!favoritieState);
    }

    const selectSeason = (season: number) => {
        setSelectedSeason(season);
    }

    return (

        contentLoaded ? (
            <ThemedView style={styles.background}>
                <View style={styles.header}>
                    <Image source={{uri: league?.league.logo_url}} style={styles.leagueImage} resizeMode='contain'/>
                    <ThemedText style={{fontSize: 19}}>
                        {league?.league.name}
                    </ThemedText>
                        <LeagueSelect
                            selected={selectedSeason === -1 ? '' : `${selectedSeason}`}
                            setSelected={selectSeason}
                            values={league ? league.seasons.map((season) => {
                                return (
                                    {
                                        name: `${season}`,
                                        value: `${season}`
                                    }
                                )
                            }) : ([
                                {
                                    name: '22',
                                    value: '2022'
                                },
                                {
                                    name: '23',
                                    value: '2023'
                                },
                                {
                                    name: '24',
                                    value: '2024'
                                },
                            ])}
                            style={{
                                marginLeft: 6,
                                marginTop: 2
                            }}
                            selectFontSize={13}
                            iconSize={19}
                        />
                    <TouchableOpacity onPress={changeFavoritie}>
                        <ThemedIcon
                            IconComponent={favoritieState ? FilledStar : UnfilledStar}
                            darkColor={Colors.dark.Red}
                            lightColor={Colors.light.Red}
                            style={styles.star}
                            height={24}
                            width={24}
                        />
                    </TouchableOpacity>
                </View>
                
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props => (
                        <CustomTabBar {...props} />
                    )}
                    style={{
                        top: 25
                    }}
                    lazy
                    renderLazyPlaceholder={() => (
                        <View>
                            <LoadingIcon />
                        </View>
                        )
                    }
                />
            </ThemedView>
        ) : (
            <LoadingIcon />
        )

    );
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        flex: 1
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