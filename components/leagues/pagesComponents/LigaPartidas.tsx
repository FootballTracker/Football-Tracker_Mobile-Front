import { useEffect, useRef, useState, memo } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MatchCard, { MatchCardI } from '@/components/matches/MatchCard';
import { formatDate, formatTime } from '@/lib/format';
import api from "@/lib/Axios"

import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { PickRound } from '@/components/leagues/PickRound';
import MatchSection from '@/components/matches/MatchSection';
import LoadingIcon from '@/components/LoadingIcon';
import Section from '@/components/Section';

const windowWidth = Dimensions.get('window').width;

interface LigaPartidasProps {
    season: number
    leagueId: number
}

interface FullRoundI {
    day: string;
    matches: MatchCardI[];
}

function LigaPartidas({ season, leagueId } : LigaPartidasProps) {

    const [round, setRound] = useState(1);
    const [fullRound, setFullRound] = useState<FullRoundI[]>();
    const cacheRef = useRef<Record<number, FullRoundI[]>>({});

    const rounds = Array.from({ length: 38 }, (_, i) => ({
        name: `${i + 1}`,
        value: `${i + 1}`
    }));

    useEffect(() => {
        cacheRef.current = {};
    }, [season]);

    useEffect(() => {
        if(season === -1) return;
        getMatches();
    }, [round, season]);


    async function getMatches() {
        if (cacheRef.current[round]) {
            setFullRound(cacheRef.current[round]);
            return;
        }

        setFullRound(undefined);
        
        await api.get('matches', {
            params: {
                round,
                id: leagueId,
                season: season
            }}
        ).then((response) => {

            let currIndex = 0;
            const currRound: FullRoundI[] = [{day: response.data[0].date, matches: []}];
            let first = true;
            let formatedDate: string;
            let lastFormatedDate: string = '';

            for(const match of response.data) {
                formatedDate = formatDate(match.date);
                
                if(first) {
                    lastFormatedDate = formatedDate;
                    first = false;
                }

                if(formatedDate === lastFormatedDate) {
                    currRound[currIndex].matches.push(match);
                } else {
                    currIndex++;
                    lastFormatedDate = formatedDate;
                    currRound.push({day: match.date, matches: [match]})
                }
            }

            cacheRef.current[round] = currRound;
            setFullRound(currRound);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar partidas.');
        });
    }

    return (
        <ThemedScrollView style={{top: 25}}>
            <PickRound
                values={rounds}
                selected={round}
                setSelected={setRound}
            />

            { fullRound && fullRound.length ?
                fullRound.map((values, index) => (
                    <Section 
                        icon={{
                            IconComponent: MaterialCommunityIcons,
                            name: "calendar-text",
                            style: styles.calendarIcon,
                            darkColor: Colors.dark.Red,
                            lightColor: Colors.light.Red,
                            size: 28
                        }}
                        text={formatDate(values.day)}
                        key={index}
                    >
                        {values.matches.map((match, index) => (
                            <MatchCard id={match.id} home_team={match.home_team} away_team={match.away_team} date={formatTime(match.date)} key={index}/>
                        ))}
                    </Section>
                ))
            :
                <View>
                    <LoadingIcon />
                </View> 
            }

        </ThemedScrollView>
    )
}


const styles = StyleSheet.create({
    content: {
        width: windowWidth*0.86,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 25,
        marginBottom: 40
    },
    calendarIcon: {
        marginTop: 1,
        marginHorizontal: 5
    },
});

// Memoiza o componente para evitar re-renderizações desnecessárias com o TabView
export default memo(LigaPartidas, (prevProps, nextProps) => {
  return prevProps.season === nextProps.season;
});