import { useEffect, useState, memo } from 'react';
import { _View, Image, StyleSheet, View } from 'react-native';
import api from "@/lib/Axios"
import { LeagueTableItemProps } from '../table/LeagueTableItem';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import LoadingIcon from '@/components/LoadingIcon';
import LeagueTable from '../table/LeagueTable';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { Colors } from '@/constants/Colors';
import InfoMessage from '@/components/InfoMessage';

interface LigaClassificacaoProps {
    season: number;
    leagueId: number;
    leagueName: string;
}

function LigaClassificacao({ season, leagueId, leagueName } : LigaClassificacaoProps) {

    const [classi, setClassi] = useState<LeagueTableItemProps[] | null>(null);

    useEffect(() => {
        getClassi();
    }, [season]);


    async function getClassi() {
        setClassi(null);
        
        await api.get(`league/${leagueId}/classification`
        ).then((response: any) => {
            setClassi(response.data);
        }).catch((e: any) => {
            if(e.response.data.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar classificação.');
        });
    }

    return (
        <ThemedView style={{top: 25}}>

            <View style={styles.content}>

                {classi && classi.length ?
                    <>
                        <View style={styles.winner}>
                            <ThemedText style={styles.winnerLeagueText}>
                                Vencedor {leagueName} - {season}
                            </ThemedText>
                            <Image source={{uri: classi[0].teamLogo}} resizeMode={"contain"} style={styles.winnerImage}/>
                            <ThemedText style={styles.winnerName}>
                                {classi[0].teamName}
                            </ThemedText>
                        </View>
                        
                        {/* <View style={{marginBottom: 30, marginTop: 10}}>
                            <InfoMessage text='Clique em uma linha para mais informações.' />
                        </View> */}

                        <LeagueTable 
                            teams={classi}
                        />
                    </>
                :
                 <View style={{height: 50}}>
                     <LoadingIcon />
                 </View>
                }
            </View>

        </ThemedView>
    )
}


const styles = StyleSheet.create({
    content: {
        marginBottom: 40,
    },
    winner: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 25,
        // marginTop: 5
    },
    winnerLeagueText: {
        fontFamily: "Kokoro",
        fontSize: 19,
        marginTop: -5,
    },
    winnerName: {
        marginTop: 5,
        fontFamily: "Kokoro",
        fontSize: 19,
    },
    winnerImage: {
        marginTop: 15,
        height: 90,
        width: 90,
    },
});

// Memoiza o componente para evitar re-renderizações desnecessárias com o TabView
export default memo(LigaClassificacao, (prevProps, nextProps) => {
  return prevProps.season === nextProps.season;
});