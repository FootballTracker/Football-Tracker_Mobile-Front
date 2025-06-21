import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { TabView } from 'react-native-tab-view';
import FilledStar from '@/assets/Icons/FilledStar.svg';
import { useItemsContext } from '@/context/ItemsContext';
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg';
import api from "@/lib/Axios";
import { TeamInfoProps } from '@/components/teams/pagesComponents/TimeInfo';
import { MatchCardI } from '@/components/matches/MatchCard';
import { Toast } from 'toastify-react-native';
import { useUserContext } from '@/context/UserContext';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import LoadingIcon from '@/components/LoadingIcon';

//scenes to render
import TimeInfo from '@/components/teams/pagesComponents/TimeInfo';
import TimeEquipe from '@/components/teams/pagesComponents/TimeEquipe';
import TimeClassificacao from '@/components/teams/pagesComponents/TimeClassif';
import FavoriteStar from '@/components/FavoriteStar';
import { SwapFavorites } from '@/constants/Favorites';

export interface TeamInfoI {
    id: string;
    name: string;
    logo: string;
    code: string;
    country: string;
    country_flag: string;
    founded: string;
}

export interface TeamVenueI {
    name: string;
    city: string;
    address: string;
    capacity: string;
    surface: string;
    image_url: string;
}

interface TeamLeaguesI {
    id: string;
    name: string;
    season: string;
    logo_url: string;
}

interface TeamPlayerI {
    id: string;
    player: string;
    playerImage: string;
}

export interface TeamPlayersI {
    coach: string;
    coach_imagem: string | undefined;
    goalkeeper: TeamPlayerI[];
    defensor: TeamPlayerI[];
    mid_field: TeamPlayerI[];
    attacker: TeamPlayerI[];
}

interface TeamDataI {
    team: TeamInfoI;
    team_venue: TeamVenueI;
    leagues: TeamLeaguesI;
    last_matches: MatchCardI[];
    players: TeamPlayersI;
}

export default function Team() {
    const { teamId } = useLocalSearchParams();

    const [teamData, setTeamData] = useState<TeamDataI | undefined>();

    const [favoriteState, setFavoriteState] = useState(false);
    
    const { setFavoriteTeams, setTeams } = useItemsContext();
    const { user } = useUserContext();
    
    const [contentLoaded, setContentLoaded] = useState(false);
    
    const [index, setIndex] = useState(0);
    
    //routes to render
    const [routes] = useState([
        { key: 'informacoes', title: 'Informações' },
        { key: 'equipe', title: 'Equipe' },
        { key: 'classificacao', title: 'Classificação' },
    ]);

    const renderScene = ({ route }: any) => {
        if(!teamData) return;
        switch (route.key) {
            case 'informacoes':
                return <TimeInfo team={teamData.team} last_matches={teamData.last_matches} team_venue={teamData.team_venue}/>;
            case 'equipe':
                return <TimeEquipe players={teamData.players} />;
            case 'classificacao':
                return <TimeClassificacao id={teamData.team.id}/>;
            default:
                return null;
        }
    };

    useEffect(() => {
        getTeamData();
    }, []);


    async function getTeamData() {
        await api.get(`teams/${teamId}`).
        then((response: any) => {
            setTeamData(response.data);
            setFavoriteState(response.data.team.is_favorite);
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
                        text: "Erro ao buscar dados do time"
                    }
                });
            }
        }).finally(() => {
            setContentLoaded(true);
        });
    }


    const changeFavoritie = () => {
        SwapFavorites(setFavoriteTeams, setTeams, {id: teamData?.team.id, name: teamData?.team.name, logo: teamData?.team.logo, is_favorite: favoriteState, show: true}, "team", user?.id);
        setFavoriteState(!favoriteState);
    }

    return (

        contentLoaded ? (
            <ThemedView style={styles.background}>
                <View style={styles.header}>
                    <Image source={{uri: teamData?.team.logo}} style={styles.teamImage} resizeMode='contain'/>
                    <ThemedText style={{fontSize: 19, fontFamily: "Kdam", marginRight: 6}}>
                        {teamData?.team.name}
                    </ThemedText>
                    <FavoriteStar favorite={ favoriteState } handleClick={ changeFavoritie } />
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
                        <LoadingIcon />
                    )}
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
    teamImage: {
        width: 55,
        height: 45,
        marginRight: 5
    },
    star: {
        marginTop: -2,
        paddingLeft: 3,
        paddingRight: 3
    }
});