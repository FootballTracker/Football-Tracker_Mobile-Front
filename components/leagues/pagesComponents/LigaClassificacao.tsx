//Default Imports
import { LeagueTableItemProps } from '../table/LeagueTableItem';
import { useEffect, useState, memo, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import api from "@/lib/Axios"

//Components
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import LeagueTable from '../table/LeagueTable';
import { View } from 'react-native';

//Icons
import LoadingIcon from '@/components/LoadingIcon';

interface LigaClassificacaoProps {
    season: number;
    leagueId: number;
    leagueName: string;
}

function LigaClassificacao({ season, leagueId, leagueName }: LigaClassificacaoProps) {
    const [classi, setClassi] = useState<LeagueTableItemProps[] | null>(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        getClassi();
    }, [season]);

    async function getClassi() {
        setClassi(null);

        try {
            const response = await api.get(`league/${leagueId}/classification`);
            setClassi(response.data);
        } catch (e: any) {
            if (e.response?.data?.detail) alert(e.response.data.detail);
            else alert('Erro ao buscar classificação.');
        }
    }

    const animatedHeaderOpacity = scrollY.interpolate({
        inputRange: [0, 130],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const animatedHeaderTranslateY = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 150],
        extrapolate: 'clamp',
    });

    const animatedHeaderScale = scrollY.interpolate({
        inputRange: [0, 180],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const animatedStyles = StyleSheet.create({
        header: {
            transform: [
                {scale: animatedHeaderScale},
                {translateY: animatedHeaderTranslateY}
            ],
            opacity: animatedHeaderOpacity,
        }
    });

    return (
        <ThemedView style={{flex: 1}}>
            {classi && classi.length ? (
                <Animated.ScrollView scrollEventThrottle={16} onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], { useNativeDriver: true})} contentContainerStyle={styles.content}>
                    <Animated.View style={[styles.winnerContainer, animatedStyles.header]}>
                        <ThemedText style={styles.winnerLeagueText}> Vencedor {leagueName} - {season} </ThemedText>
                        <Animated.Image
                            source={{ uri: classi[0].teamLogo }}
                            resizeMode="contain"
                            style={styles.winnerImage}
                        />
                        <ThemedText style={styles.winnerName}> {classi[0].teamName} </ThemedText>
                    </Animated.View>

                    <LeagueTable teams={classi} />
                </Animated.ScrollView>
            ) : (
                <View style={{ height: 50 }}>
                    <LoadingIcon />
                </View>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: 40,
    },
    winnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 25,
        transformOrigin: 'center'
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
    }
});

export default memo(LigaClassificacao, (prevProps, nextProps) => {
  return prevProps.season === nextProps.season;
});