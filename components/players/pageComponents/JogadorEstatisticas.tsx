import { router } from 'expo-router';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import Section from '@/components/Section';
import InfoMessage from '@/components/InfoMessage';
import Card from '@/components/Card';
import { View } from 'react-native';

//Type
export type EstatisticasProps = {
    playerId: string;
    playerCompetitions: {
        team: {
            id: string,
            name: string,
            logo: string,
        },
        competitions: {
            id: string,
            name: string,
            logo: string,
            season: string,
        }[]
    }[]
}

export default function JogadorEstatisticas({playerId, playerCompetitions}: EstatisticasProps) {

    function accessLeague(teamId: string, leagueId: string) {
        router.push(`/(pages)/player/${playerId}/${teamId}/${leagueId}`);
    }

    return (
        <ThemedScrollView style={{marginTop: 5}}>
            <View style={{marginBottom: 50}}>
                {playerCompetitions && playerCompetitions.length ? playerCompetitions.map((sec, index) => (
                    <Section text={sec.team.name} key={index} image={sec.team.logo}>
                        {sec.competitions && sec.competitions.length && sec.competitions.map((league, index) => (
                            <Card 
                                info={`${league.name} - ${league.season}`}
                                image={league.logo}
                                handleOpen={() => accessLeague(sec.team.id, league.id)}
                                key={index}
                            />
                        ))}
                    </Section>
                )) : (
                    <InfoMessage text="Nenhuma liga que o jogador participou encontrada"/>
                )}
            </View>
        </ThemedScrollView>
    )
}