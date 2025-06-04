import { useEffect, useState, memo } from 'react';
import { _View, StyleSheet, View } from 'react-native';
import api from "@/lib/Axios"
import { LeagueTableItemProps } from '../table/LeagueTableItem';

import LoadingIcon from '@/components/LoadingIcon';
import LeagueTable from '../table/LeagueTable';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';

interface LigaClassificacaoProps {
    season: number
    leagueId: number
}

function LigaClassificacao({ season, leagueId } : LigaClassificacaoProps) {

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
                    <LeagueTable 
                        teams={classi}
                    />
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
        marginBottom: 40
    },
});

// Memoiza o componente para evitar re-renderizações desnecessárias com o TabView
export default memo(LigaClassificacao, (prevProps, nextProps) => {
  return prevProps.season === nextProps.season;
});