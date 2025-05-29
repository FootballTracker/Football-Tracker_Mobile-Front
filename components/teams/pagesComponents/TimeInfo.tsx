import { StyleSheet, Dimensions, View, Image } from 'react-native';
import { memo, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MatchCard, { MatchCardI } from '@/components/matches/MatchCard';
import { TeamInfoI } from '@/app/(pages)/team/[teamId]';
import { TeamVenueI } from '@/app/(pages)/team/[teamId]';
import { formatDate } from '@/lib/format';

import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import MatchSection from '@/components/matches/MatchSection';
import Section from '@/components/Section';
import SingleInfo from '@/components/SingleInfo';

const windowWidth = Dimensions.get('window').width;

export interface TeamInfoProps {
    team: TeamInfoI;
    team_venue: TeamVenueI;
    last_matches: MatchCardI[];
}

function TimeInfo({ team, team_venue, last_matches } : TeamInfoProps) {

    const [aspectRatio, setAspectRatio] = useState<number | undefined>();

    useEffect(getImageSize, []);

    function getImageSize() {
        team_venue && Image.getSize(team_venue.image_url, (width, height) => {
            setAspectRatio(width/height);
            // setLoading(false);
        }, (error) => {
            console.error("Erro ao obter a imagem:", error);
            setAspectRatio(1);
        });
    }

    return (
        <ThemedScrollView style={{top: 1}}>

            <Section
                icon={{
                    IconComponent: Ionicons,
                    name: "football-outline",
                    style: styles.icons,
                    darkColor: Colors.dark.Red,
                    lightColor: Colors.light.Red,
                    size: 28
                }}
                text='Últimas Partidas'
            >   
                {last_matches.map((match, index) => (
                    <MatchCard id={match.id} home_team={match.home_team} away_team={match.away_team} date={formatDate(match.date, false)} key={index}/>
                ))}
            </Section>

            <Section 
                text='Geral'
                icon={{
                    IconComponent: MaterialCommunityIcons,
                    name: "information",
                    size: 24,
                    darkColor: Colors.dark.Red,
                    lightColor: Colors.light.Red,
                    style: [{marginTop: 3}, styles.icons]
                }}
            >
                <SingleInfo infoName='Sigla' info={team.code} />
                <SingleInfo infoName='País' info={team.country} imageUrl={team.country_flag}/>
                <SingleInfo infoName='Fundação' info={team.founded} />
            </Section>

            <Section 
                text='Estádio'
                icon={{
                    IconComponent: MaterialCommunityIcons,
                    name: "information",
                    size: 24,
                    darkColor: Colors.dark.Red,
                    lightColor: Colors.light.Red,
                    style: [{marginTop: 3}, styles.icons]
                }}
            >
                <SingleInfo infoName='Nome' info={team_venue.name} />
                <SingleInfo infoName='Endereço' info={team_venue.address} imageUrl={team.country_flag}/>
                <SingleInfo infoName='Cidade' info={team_venue.city} />
                <SingleInfo infoName='Capacidade' info={team_venue.capacity} />
                <SingleInfo infoName='Gramado' info={team_venue.surface === "grass" ? "Natural" : "Grama sintética"} />
            </Section>
            
            <View style={{width: "90%", paddingHorizontal: 10, marginHorizontal: "auto", marginBottom: 50}}>
                <Image source={{uri: team_venue.image_url}} style={[styles.image, {aspectRatio: aspectRatio}]}/>
            </View>

        </ThemedScrollView>
    )
}

export default memo(TimeInfo);

const styles = StyleSheet.create({
    icons: {
        marginHorizontal: 5
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
        marginHorizontal: "auto",
        borderRadius: 15,
    }
});