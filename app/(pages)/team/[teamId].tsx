import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { TabView } from 'react-native-tab-view';
import FilledStar from '@/assets/Icons/FilledStar.svg';
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg';
import api from "@/lib/Axios";
import { TeamInfoProps } from '@/components/teams/pagesComponents/TimeInfo';
import { MatchCardI } from '@/components/matches/MatchCard';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import LoadingIcon from '@/components/LoadingIcon';

//scenes to render
import TimeInfo from '@/components/teams/pagesComponents/TimeInfo';
import TimeEquipe from '@/components/teams/pagesComponents/TimeEquipe';
import TimeClassificacao from '@/components/teams/pagesComponents/TimeClassif';

export interface TeamInfoI {
    id: string;
    name: string;
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
    player: string;
    playerImage: string;
}

interface TeamPlayersI {
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
    
    const [contentLoaded, setContentLoaded] = useState(false);
    
    const [favoritieState, setFavoritieState] = useState(false);
    
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
                return <TimeEquipe />;
            case 'classificacao':
                return <TimeClassificacao />;
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
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar partidas.');
        }).finally(() => {
            setContentLoaded(true);
        });
    }


    const changeFavoritie = () => {
        // alert("trocar favorito");
        setFavoritieState(!favoritieState);
    }

    return (

        contentLoaded ? (
            <ThemedView style={styles.background}>
                <View style={styles.header}>
                    <Image source={{uri: "https://media.api-sports.io/football/teams/119.png"}} style={styles.teamImage} resizeMode='contain'/>
                    <ThemedText style={{fontSize: 19, fontFamily: "Kdam", marginRight: 6}}>
                        {teamData?.team.name}
                    </ThemedText>
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