import { StyleSheet, Dimensions, View, Image } from 'react-native';
import { memo, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { MatchCardI } from '@/components/matches/MatchCard';
import { TeamInfoI } from '@/app/(pages)/team/[teamId]';
import { TeamVenueI } from '@/app/(pages)/team/[teamId]';
import { formatDate } from '@/lib/format';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import MatchSection from '@/components/matches/MatchSection';
import InfoSection from '@/components/InfoSection';

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

            <View style={styles.content}>
                <MatchSection
                    icon={{
                        IconComponent: Ionicons,
                        name: "football-outline",
                        style: styles.icons,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red,
                        size: 28
                    }}
                    matches={last_matches.map(match => ({
                        ...match,
                        date: formatDate(match.date, false)
                    }))}
                    text='Últimas Partidas'
                />

                <InfoSection 
                    text='Geral'
                    icon={{
                        IconComponent: MaterialCommunityIcons,
                        name: "information",
                        size: 24,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red,
                        style: [{marginTop: 3}, styles.icons]
                    }}
                    items={[
                        {
                            description: "Sigla",
                            value: team.code
                        },
                        {
                            description: "País",
                            value: team.country,
                            imageUrl: team.country_flag
                        },
                        {
                            description: "Fundação",
                            value: team.founded
                        },
                    ]}
                />


                <InfoSection 
                    text='Estádio'
                    icon={{
                        IconComponent: MaterialCommunityIcons,
                        name: "soccer-field",
                        size: 28,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red,
                        style: [{marginTop: 1}, styles.icons]
                    }}
                    items={[
                        {
                            description: "Nome",
                            value: team_venue.name
                        },
                        {
                            description: "Endereço",
                            value: team_venue.address
                        },
                        {
                            description: "Cidade",
                            value: team_venue.city
                        },
                        {
                            description: "Capacidade",
                            value: team_venue.capacity
                        },
                        {
                            description: "Gramado",
                            value: team_venue.surface === "grass" ? "Natural" : "Grama sintética"
                        },
                    ]}
                />

                <Image source={{uri: team_venue.image_url}} style={[styles.image, {aspectRatio: aspectRatio}]}/>
            </View>

        </ThemedScrollView>
    )
}

export default memo(TimeInfo);

const styles = StyleSheet.create({
    content: {
        width: windowWidth*0.86,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 25,
        marginBottom: 40
    },
    icons: {
        marginHorizontal: 5
    },
    image: {
        width: '98%',
        resizeMode: 'contain',
        marginHorizontal: "auto",
        borderRadius: 15,
        marginTop: -20,
    }
});