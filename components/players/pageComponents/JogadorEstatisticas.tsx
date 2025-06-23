import { router } from 'expo-router';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import Section from '@/components/Section';
import InfoMessage from '@/components/InfoMessage';
import Card from '@/components/Card';
import { View } from 'react-native';

//Type
export type EstatisticasProps = {
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
        }[]
    }[]
}

export default function JogadorEstatisticas({playerCompetitions}: EstatisticasProps) {

    function accessLeague(id: string) {
        router.push(`/(pages)/league/${id}`);
    }

    return (
        <ThemedScrollView style={{marginTop: 5}}>
            <View style={{marginBottom: 50}}>
                {playerCompetitions && playerCompetitions.length ? playerCompetitions.map((sec, index) => (
                    <Section text={sec.team.name} key={index} image={sec.team.logo}>
                        {sec.competitions && sec.competitions.length && sec.competitions.map((league, index) => (
                            <Card 
                                info={league.name}
                                image={league.logo}
                                handleOpen={() => accessLeague(league.id)}
                                key={index}
                            />
                        ))}
                    </Section>
                )) : (
                    <InfoMessage text="Nenhuma competição encontrada"/>
                )}
            </View>
        </ThemedScrollView>
    )
}