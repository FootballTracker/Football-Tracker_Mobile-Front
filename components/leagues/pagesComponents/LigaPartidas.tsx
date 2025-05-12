import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { MatchCardI } from '@/components/matches/MatchCard';
import { formatDateToBR } from '@/lib/format';
import api from "@/lib/Axios"

import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { PickRound } from '@/components/PickRound';
import MatchSection from '@/components/matches/MatchSection';
import LoadingIcon from '@/components/LoadingIcon';

const windowWidth = Dimensions.get('window').width;

interface LigaPartidasProps {
    season: number
    leagueId: number
}

interface MatchesI {
    day: string
    matches: MatchCardI[]
}

function LigaPartidas({ season, leagueId } : LigaPartidasProps) {

    const [round, setRound] = useState(1);
    const [matches, setMatches] = useState<MatchesI[]>();
    const cacheRef = useRef<Record<number, MatchesI[]>>({});

    const rounds = Array.from({ length: 38 }, (_, i) => ({
        name: `${i + 1}`,
        value: `${i + 1}`
    }));

    useEffect(() => {
        cacheRef.current = {};
    }, [season]);

    useEffect(() => {
        getMatches();
    }, [round, season]);


    async function getMatches() {
        if (cacheRef.current[round]) {
            setMatches(cacheRef.current[round]);
            return;
        }

        setMatches(undefined);
        
        await api.get('matches', {
            params: {
                round,
                id: leagueId,
                season: season
            }}
        ).then((response: any) => {
            cacheRef.current[round] = response.data;
            setMatches(response.data);
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

            <View style={styles.content}>
                { matches && matches.length ?
                    matches.map((values, index) => (
                        <MatchSection
                            icon={{
                                IconComponent: MaterialCommunityIcons,
                                name: "calendar-text",
                                style: styles.calendarIcon,
                                darkColor: Colors.dark.Red,
                                lightColor: Colors.light.Red,
                                size: 28
                            }}
                            matches={values.matches}
                            text={formatDateToBR(values.day)}
                            key={index}
                        />
                    ))
                :
                    <View>
                        <LoadingIcon />
                    </View> 
                }
            </View>

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
export default React.memo(LigaPartidas, (prevProps, nextProps) => {
  return prevProps.season === nextProps.season;
});