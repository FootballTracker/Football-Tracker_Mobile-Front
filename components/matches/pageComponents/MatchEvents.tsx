//Default Imports
import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { memo, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { MatchCardI } from "../MatchCard";
import { AxiosResponse } from "axios";
import { Toast } from "toastify-react-native";
import api from "@/lib/Axios";

//Components
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from "@/components/DefaultComponents/ThemedIcon";
import { TeamsLogosInformation } from "../TeamsLogosInformation";
import LoadingIcon from "@/components/LoadingIcon";
import Section from "@/components/Section";
import { DashedLine } from "../DashedLine";
import { EventLine } from "../EventLine";
import { View } from "react-native";

//Icons
import Timer from '@/assets/Icons/Timer.svg'
import Whistle from '@/assets/Icons/Whistle.svg'

//Types
type MatchEventsProps = {
    match: MatchCardI;
}

export type Event = {
    player: {
        id: string,
        name: string,
    },
    assist: {
        id: string | null,
        name: string | null,
    },
    type: 'Goal' | 'Card' | 'Subst' | 'Var',
    detail: string,
    comments: string | null,
}

export type MinuteEvent = {
    time: number
    home_team: Event[],
    away_team: Event[],
    scoreboard?: string,
}

function MatchEvents({ match } : MatchEventsProps) {
    const { theme } = useTheme();
    const { matchId } = useLocalSearchParams();
    const [contentLoaded, setContentLoaded] = useState(false);
    const [events, setEvents] = useState<MinuteEvent[]>();

    useEffect(() => {
        // getEvents();
    }, [])

    //Temporário, apenas enquanto ainda n ta buscando os dados do back
    useEffect(() => {
        getEvents();
    }, [])

    async function getEvents() {
        await api.get(`match/${matchId}/events`
        ).then((response: AxiosResponse<MinuteEvent[]>) => {
            setEvents(response.data);
        }).catch((e: any) => {
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
                        text: "Erro ao buscar eventos"
                    }
                });
            }
        }).finally(() => {
            setContentLoaded(true);
        });
    }

    const styles = StyleSheet.create({
        beginAndEndMatchContainer: {
            alignItems: 'center',
            gap: 5,
        },
        backgroundLine: {
            width: 5,
            backgroundColor: Colors[theme].Red,
            position: 'absolute',
        },
        topLine: {
            height: 20,
            top: -20,
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
        },
        midLine: {
            height: '100%',
        },
        bottomLine: {
            height: 20,
            bottom: -20,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
        },
        text: {
            fontFamily: 'Karla',
            fontSize: 12,
        }
    })

    return (
        contentLoaded ? (
            <ScrollView style={{flex: 1}}>
                <Section style={{marginBottom: 50}}>
                    <TeamsLogosInformation home_team={match.home_team} away_team={match.away_team} style={{marginBottom: 15}}>
                        <View style={[styles.beginAndEndMatchContainer, {top: -9}]}>
                            <ThemedText style={styles.text} colorName="Red">Linha do Tempo</ThemedText>
                            <ThemedIcon IconComponent={Timer} colorName="Red" width={22} height={22} />
                        </View>
                    </TeamsLogosInformation>

                    
                    <View style={{width: '100%'}}>
                        <DashedLine style={{height: 1}} />

                        <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%'}}>
                            <View style={[styles.backgroundLine, styles.topLine]}></View>
                            <View style={[styles.backgroundLine, styles.midLine]}></View>
                            <View style={[styles.backgroundLine, styles.bottomLine]}></View>
                        </View>
                        
                        {events && events.map((event, index) => (
                            <EventLine
                                time={event.time}
                                home_team={event.home_team}
                                away_team={event.away_team}
                                scoreboard={event.scoreboard ? event.scoreboard : undefined}
                                key={index}
                            />
                        ))}
                    </View>

                    <View style={[styles.beginAndEndMatchContainer, {marginTop: 20}]}>
                        <ThemedIcon IconComponent={Whistle} colorName="Red" width={22} height={22} />
                        <ThemedText style={styles.text} colorName="Red">Fim da Partida</ThemedText>
                    </View>
                </Section>
            </ScrollView>
        ) : (
            <LoadingIcon />
        )
    )
}

export default memo(MatchEvents, (prevProps, nextProps) => {
    return prevProps.match === nextProps.match
});

const eventsMock : MinuteEvent[] = [
    {
        time: 8,
        home_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: '321',
                    name: 'Carzalbé',
                },
                type: 'Subst',
                detail: 'Substitution 1',
                comments: null,
            },
        ],
        away_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: '321',
                    name: 'Carzalbé',
                },
                type: 'Subst',
                detail: 'Substitution 1',
                comments: null,
            },
            {
                player: {
                    id: '123',
                    name: 'Carzalbé',
                },
                assist: {
                    id: '321',
                    name: 'Gilberto',
                },
                type: 'Subst',
                detail: 'Substitution 2',
                comments: null,
            },
        ]
    },
    {
        time: 15,
        home_team: [],
        away_team: [
            {
                player: {
                    id: '123',
                    name: 'Carzalbé',
                },
                assist: {
                    id: null,
                    name: null,
                },
                type: 'Goal',
                detail: 'Normal Goal',
                comments: 'Penalty',
            },
        ],
        scoreboard: '0 x 1'
    },
    {
        time: 20,
        home_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: null,
                    name: null,
                },
                type: 'Card',
                detail: 'Yellow Card',
                comments: 'Falta',
            },
        ],
        away_team: []
    },
    {
        time: 21,
        home_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: null,
                    name: null,
                },
                type: 'Card',
                detail: 'Red Card',
                comments: 'Discussão',
            },
            {
                player: {
                    id: '123',
                    name: 'Carzalbé',
                },
                assist: {
                    id: '321',
                    name: 'Gilberto',
                },
                type: 'Subst',
                detail: 'Substitution 2',
                comments: null,
            },
        ],
        away_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: '321',
                    name: 'Carzalbé',
                },
                type: 'Subst',
                detail: 'Substitution 3',
                comments: null,
            },
            {
                player: {
                    id: '123',
                    name: 'Carzalbé',
                },
                assist: {
                    id: null,
                    name: null,
                },
                type: 'Card',
                detail: 'Red Card',
                comments: 'Discussão',
            },
        ]
    },
    {
        time: 27,
        home_team: [],
        away_team: [
            {
                player: {
                    id: '123',
                    name: 'Carzalbé',
                },
                assist: {
                    id: '321',
                    name: 'Gilberto',
                },
                type: 'Goal',
                detail: 'Normal Goal',
                comments: null,
            },
        ],
        scoreboard: '0 x 2'
    },
    {
        time: 36,
        home_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: null,
                    name: null,
                },
                type: 'Goal',
                detail: 'Normal Goal',
                comments: null,
            },
        ],
        away_team: [],
        scoreboard: '1 x 2'
    },
    {
        time: 43,
        home_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: '321',
                    name: 'Carzalbé',
                },
                type: 'Subst',
                detail: 'Substitution 3',
                comments: null,
            },
        ],
        away_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: '321',
                    name: 'Carzalbé',
                },
                type: 'Subst',
                detail: 'Substitution 4',
                comments: null,
            },
        ]
    },
    {
        time: 50,
        home_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: '321',
                    name: 'Carzalbé',
                },
                type: 'Card',
                detail: 'Yellow Card',
                comments: null,
            },
        ],
        away_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: '321',
                    name: 'Carzalbé',
                },
                type: 'Subst',
                detail: 'Substitution 5',
                comments: null,
            },
        ]
    },
    {
        time: 57,
        home_team: [
            {
                player: {
                    id: '123',
                    name: 'Gilberto',
                },
                assist: {
                    id: '321',
                    name: 'Carzalbé',
                },
                type: 'Goal',
                detail: 'Own Goal',
                comments: null,
            },
        ],
        away_team: [],
        scoreboard: '1 x 3'
    },
]