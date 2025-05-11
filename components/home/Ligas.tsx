import { StyleSheet, Dimensions, View  } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import { Colors } from '@/constants/Colors';

import LeaguesSection from '@/components/leagues/LeaguesSection';
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { ThemedInput } from '@/components/DefaultComponents/ThemedInput';

const windowWidth = Dimensions.get('window').width;

export default function Ligas() {
    return (
        <ThemedScrollView style={styles.background}>
            <ThemedInput isSearch={true} numberOfLines={1} style={styles.searchBar} />

            <View style={styles.content}>

                <LeaguesSection 
                    text='Favoritas'
                    leagues={[
                        {
                            id: '1',
                            image: "https://media.api-sports.io/football/leagues/71.png",
                            name: "Serie A",
                            favoritie: true
                        },
                        {
                            id: '140',
                            image: "https://media.api-sports.io/football/leagues/140.png",
                            name: "La Liga",
                            favoritie: true
                        },
                        {
                            id: '39',
                            image: "https://media.api-sports.io/football/leagues/39.png",
                            name: "Premier League",
                            favoritie: true
                        }
                    ]}
                    icon={{
                        IconComponent: FilledStar,
                        width: 27,
                        height: 27,
                        style: styles.starIcon,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red,
                    }}
                />

                <LeaguesSection 
                    text='Principais'
                    icon={{
                        IconComponent: FontAwesome5,
                        name: 'crown',
                        size: 20,
                        style: styles.crownIcon,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red
                    }}
                    leagues={[
                        {
                            id: '71',
                            image: "https://media.api-sports.io/football/leagues/71.png",
                            name: "Serie A",
                            favoritie: false
                        },
                        {
                            id: '140',
                            image: "https://media.api-sports.io/football/leagues/140.png",
                            name: "La Liga",
                            favoritie: false
                        },
                        {
                            id: '39',
                            image: "https://media.api-sports.io/football/leagues/39.png",
                            name: "Premier League",
                            favoritie: false
                        },
                        {
                            id: '71',
                            image: "https://media.api-sports.io/football/leagues/71.png",
                            name: "Serie A",
                            favoritie: false
                        },
                        {
                            id: '140',
                            image: "https://media.api-sports.io/football/leagues/140.png",
                            name: "La Liga",
                            favoritie: false
                        },
                        {
                            id: '39',
                            image: "https://media.api-sports.io/football/leagues/39.png",
                            name: "Premier League",
                            favoritie: false
                        },
                        {
                            id: '71',
                            image: "https://media.api-sports.io/football/leagues/71.png",
                            name: "Serie A",
                            favoritie: false
                        },
                        {
                            id: '140',
                            image: "https://media.api-sports.io/football/leagues/140.png",
                            name: "La Liga",
                            favoritie: false
                        },
                        {
                            id: '39',
                            image: "https://media.api-sports.io/football/leagues/39.png",
                            name: "Premier League",
                            favoritie: false
                        },
                        {
                            id: '71',
                            image: "https://media.api-sports.io/football/leagues/71.png",
                            name: "Serie A",
                            favoritie: false
                        },
                        {
                            id: '140',
                            image: "https://media.api-sports.io/football/leagues/140.png",
                            name: "La Liga",
                            favoritie: false
                        },
                        {
                            id: '39',
                            image: "https://media.api-sports.io/football/leagues/39.png",
                            name: "Premier League",
                            favoritie: false
                        },
                        {
                            id: '71',
                            image: "https://media.api-sports.io/football/leagues/71.png",
                            name: "Serie A",
                            favoritie: false
                        },
                        {
                            id: '140',
                            image: "https://media.api-sports.io/football/leagues/140.png",
                            name: "La Liga",
                            favoritie: false
                        },
                        {
                            id: '39',
                            image: "https://media.api-sports.io/football/leagues/39.png",
                            name: "Premier League",
                            favoritie: false
                        },
                        
                    ]}
                />
            </View>
        </ThemedScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
    },
    searchBar: {
        width: windowWidth*0.9,
        marginHorizontal: 'auto',
        height: 40,
    },
    content: {
        top: 20,
        width: windowWidth*0.9,
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 30
    },
    starIcon: {
        marginTop: 2,
        marginRight: 5
    },
    crownIcon: {
        marginTop: 5,
        marginRight: 8
    }
});