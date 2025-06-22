import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useItemsContext } from '@/context/ItemsContext';
import { SwapFavorites } from '@/constants/Favorites';
import FavoriteStar from '@/components/FavoriteStar';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { TabView } from 'react-native-tab-view';
import FilledStar from '@/assets/Icons/FilledStar.svg';
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg';
import api from '@/lib/Axios';
import { useUserContext } from '@/context/UserContext';
import { LeagueCardI } from '@/components/leagues/LeagueCard';
import { Toast } from 'toastify-react-native';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { LeagueSelect } from '@/components/leagues/LeagueSelect';
import LoadingIcon from '@/components/LoadingIcon';

//scenes to render
import LigaPartidas from '../../../components/leagues/pagesComponents/LigaPartidas';
import LigaClassificacao from '../../../components/leagues/pagesComponents/LigaClassificacao';
import LigaRankings from '../../../components/leagues/pagesComponents/LigaRankings';

interface LeagueSeason {
    season: number;
    id: number;
}

interface LeagueFull {
    league: LeagueCardI;
    seasons: LeagueSeason[]
}

export default function League() {
    const { setFavoriteLeagues, setLeagues, favoriteLeagues } = useItemsContext();
    const { leagueId } = useLocalSearchParams();
    const { user } = useUserContext();
    const [contentLoaded, setContentLoaded] = useState(false);
    const [favoriteState, setFavoriteState] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState<LeagueSeason | null>(null);
    const [index, setIndex] = useState(0); //initial route index
    const [league, setLeague] = useState<LeagueFull>();
    
    //routes to render
    const [routes] = useState([
        { key: 'partidas', title: 'Partidas' },
        { key: 'classificacao', title: 'Classificação' },
        { key: 'rankings', title: 'Rankings' },
    ]);

    const renderScene = ({ route }: any) => {

        if(!selectedSeason || !league) return;

        switch (route.key) {
            case 'partidas':
                return <LigaPartidas leagueId={selectedSeason.id} season={selectedSeason.season}/>;
            case 'classificacao':
                return <LigaClassificacao leagueId={selectedSeason.id} season={selectedSeason.season} leagueName={league.league.name}/>;
            case 'rankings':
                return <LigaRankings leagueId={selectedSeason.id} season={selectedSeason.season}/>;
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
            setFavoriteState(league.league.is_favorite);
            setContentLoaded(true);
        }
    }, [league]);

    async function getLeague() {
        await api.get('league', {
            params: {
                user_id: user?.id,
                league_id: Number(leagueId)
            }}
        ).then((response: any) => {
            setLeague(response.data);
        }).catch((e: any) => {
            if(e.response.data.detail) {
                Toast.show({
                    props: {
                        type: "error",
                        text: e.response.data.detail
                    }
                });
            }
            else {
                Toast.show({
                    props: {
                        type: "error",
                        text: "Erro ao buscar liga"
                    }
                });
            }
        });
    }

    const changeFavoritie = async () => {
        if(!favoriteState && favoriteLeagues.length === 3) {
            Toast.show({
                props: {
                    type: "warn",
                    text: "3 ligas já estão favoritadas. Desfavorite uma liga caso deseje favoritar alguma outra"
                },
                visibilityTime: 6000
            });
            return false;
        }
        SwapFavorites(setFavoriteLeagues, setLeagues, {id: league?.league.id, name: league?.league.name, logo_url: league?.league.logo_url, is_favorite: favoriteState, show: true, api_id: league?.league.api_id}, "league", user?.id);
        setFavoriteState(!favoriteState);
    }

    const selectSeason = (season: string) => {
        if(!league) return;

        const s = league.seasons.find((s) => s.season === Number(season))
        if(!s) return;

        setSelectedSeason(s);
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
                            selected={!selectedSeason ? '' : `${selectedSeason.season}`}
                            setSelected={selectSeason}
                            values={league ? league.seasons.map((season) => {
                                return (
                                    {
                                        name: `${season.season}`,
                                        value: `${season.season}`
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
                    <FavoriteStar favorite={ favoriteState } handleClick={changeFavoritie} />
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