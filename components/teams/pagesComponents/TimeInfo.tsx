import { StyleSheet, Dimensions, View, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import MatchSection from '@/components/matches/MatchSection';
import InfoSection from '@/components/InfoSection';

const windowWidth = Dimensions.get('window').width;

export default function TimeInfo() {


    //executa quando terminar de buscar dados do back para ver aspect radio da imagem e definir no styles.image
    function getImageSize() {
        // Image.getSize(imageUri, (width, height) => {
        //     setImageWidth(width);
        //     setImageHeight(height);
        //     setLoading(false);
        // }, (error) => {
        //     console.error("Erro ao obter a imagem:", error);
        //     setLoading(false);
        // });
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
                    matches={[
                        {
                            id: 1,
                            home_team: {
                                name: 'Internacional',
                                logo: 'https://media.api-sports.io/football/teams/119.png',
                                score: 4,
                            },
                            away_team: {
                                name: 'São Luiz',
                                logo: 'https://media.api-sports.io/football/teams/10004.png',
                                score: 0,
                            },
                            time: "28/01/23"
                        },
                        {
                            id: 1,
                            home_team: {
                                name: 'Avenida',
                                logo: 'https://media.api-sports.io/football/teams/2205.png',
                                score: 1,
                            },
                            away_team: {
                                name: 'Internacional',
                                logo: 'https://media.api-sports.io/football/teams/119.png',
                                score: 1,
                            },
                            time: "24/01/23"
                        },
                        {
                            id: 1,
                            home_team: {
                                name: 'Internacional',
                                logo: 'https://media.api-sports.io/football/teams/119.png',
                                score: 2,
                            },
                            away_team: {
                                name: 'Juventude',
                                logo: 'https://media.api-sports.io/football/teams/152.png',
                                score: 2,
                            },
                            time: "20/01/23"
                        }
                    ]}
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
                            value: "INT"
                        },
                        {
                            description: "País",
                            value: "Brasil",
                            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png"
                        },
                        {
                            description: "Fundação",
                            value: "1909"
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
                            value: "Estádio José Pinheiro Borda"
                        },
                        {
                            description: "Endereço",
                            value: "Avenida Padre Cacique 891, Bairro Menino Deus",
                        },
                        {
                            description: "Cidade",
                            value: "Porto Alegre, Rio Grande do Sul"
                        },
                        {
                            description: "Capacidade",
                            value: "50128"
                        },
                        {
                            description: "Gramado",
                            value: "Natural"
                        },
                    ]}
                />

                <Image source={{uri: "https://media.api-sports.io/football/venues/244.png"}} style={styles.image}/>
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
    icons: {
        marginHorizontal: 5
    },
    image: {
        width: '98%',
        aspectRatio: 1.33,
        resizeMode: 'contain',
        marginHorizontal: "auto",
        borderRadius: 15,
        marginTop: -20,
    }
});