//Default Imports
import { LeagueTableItemProps } from '../table/LeagueTableItem';
import { useEffect, useState, memo, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import { Toast } from 'toastify-react-native';
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
    const scrollY = useRef<any>(new Animated.Value(0)).current;
    const scrollValue = useRef(0);
    const scrollRef = useRef<any>(null);
    const { theme } = useTheme();
    const animationHeight = 110;

    useEffect(() => {
        getClassi();
    }, [season]);

    async function getClassi() {
        setClassi(null);

        try {
            const response = await api.get(`league/${leagueId}/classification`);
            setClassi(response.data);
        } catch (e: any) {
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
                        text: "Erro ao buscar classificação"
                    }
                });
            }
        }
    }

    const animatedLeagueTextTranslateY = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, 57],
        extrapolate: 'clamp',
    });

    const animatedLeagueTextTranslateX = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, 120],
        extrapolate: 'clamp',
    });

    const animatedTeamTextTranslateY = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const animatedTeamTextTranslateX = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, 70],
        extrapolate: 'clamp',
    });

    const animatedTextFontScale = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [1, 0.8],
        extrapolate: 'clamp',
    });
    
    const animatedImageScale = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [1, .5],
        extrapolate: 'clamp',
    });

    const animatedHeaderTranslateX = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, -150],
        extrapolate: 'clamp',
    });

    const animatedHeaderTranslateY = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const animatedTableHeaderTranslateY = scrollY.interpolate({
        inputRange: [0, animationHeight],
        outputRange: [0, -110],
        extrapolate: 'clamp',
    });

    const animatedStyles = StyleSheet.create({
        header: {
            transform: [
                {translateX: animatedHeaderTranslateX},
                {translateY: animatedHeaderTranslateY},
            ],
        },
        image: {
            transform: [
                {scale: animatedImageScale},
            ],
        },
        leagueName: {
            transform: [
                {translateY: animatedLeagueTextTranslateY},
                {translateX: animatedLeagueTextTranslateX},
                {scale: animatedTextFontScale},
            ],
        },
        teamName: {
            transform: [
                {translateY: animatedTeamTextTranslateY},
                {translateX: animatedTeamTextTranslateX},
                {scale: animatedTextFontScale},
            ],
        },
        tableHeader: {
            transform: [
                {translateY: animatedTableHeaderTranslateY},
            ],
        },
    });

    const onScrollHandler = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
    );

    const handleValidScrollPoints = () => {
        
        if (scrollValue.current <= 60) {
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        }

        else if(scrollValue.current <= 110) {
            scrollRef.current?.scrollTo({
                y: 110,
                animated: true,
            });
        }
    };

    useEffect(() => {
        const listenerId = scrollY.addListener((v: any) => {
            scrollValue.current = v.value;
        });

        return () => {
            scrollY.removeListener(listenerId);
        };
    }, [scrollY]);

    return (
        <ThemedView style={{flex: 1}}>
            {classi && classi.length ? (
                <>
                    <ThemedView colorName='Transparent' style={{position: 'absolute', height: 115, width: '100%', zIndex: 1}}/>

                    <Animated.ScrollView ref={scrollRef} stickyHeaderIndices={[0]} scrollEventThrottle={16} onScroll={onScrollHandler} contentContainerStyle={styles.content} onMomentumScrollEnd={handleValidScrollPoints}>
                        <Animated.View style={{pointerEvents: 'none'}}>
                            <ThemedView style={{position: 'absolute', height: 115, width: '100%'}}/>

                            <View style={styles.winnerContainer}>
                                <Animated.View style={[{alignItems: 'center'}, animatedStyles.header]} >
                                    <ThemedText style={[styles.winnerLeagueText, animatedStyles.leagueName]}> Vencedor {leagueName} - {season} </ThemedText>
                                    <Animated.Image source={{ uri: classi[0].teamLogo }} resizeMode="contain" style={[styles.winnerImage, animatedStyles.image]} />
                                    <ThemedText style={[styles.winnerName, animatedStyles.teamName]}> {classi[0].teamName} </ThemedText>
                                </Animated.View>

                                <Animated.View style={[animatedStyles.tableHeader, styles.tableHeader, {borderColor: Colors[theme].Red, marginTop: 12}]}>
                                    <ThemedView style={{zIndex: 2}}>
                                        <ThemedText style={styles.tableTitle}>Tabela de Classificação</ThemedText>
                                    </ThemedView>
                                </Animated.View>
                            </View>
                        </Animated.View>

                        <LeagueTable teams={classi} />
                    </Animated.ScrollView>
                </>
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
        width: '90%',
        marginHorizontal: 'auto',
        paddingTop: 30,
        alignItems: 'center',
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
        marginBottom: 10,
    },
    winnerImage: {
        marginTop: 15,
        height: 90,
        width: 90,
    },
    tableTitle: {
        textAlign: 'center',
        paddingVertical: 6,
        fontSize: 17,
    },
    tableHeader: {
        width: '100%',
        borderBottomWidth: .6,
    },
});

export default memo(LigaClassificacao, (prevProps, nextProps) => {
    return prevProps.season === nextProps.season;
});