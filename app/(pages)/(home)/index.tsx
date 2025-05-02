import { StyleSheet, Dimensions, TextInput, View  } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import { Colors } from '@/constants/Colors';
import LeaguesSection from '@/components/leagues/LeaguesSection';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';

const windowWidth = Dimensions.get('window').width;

export default function Main() {
    return (
        <ThemedScrollView style={styles.background}>
                <View style={styles.searchBar}>
                    <EvilIcons name="search" size={24} color={Colors.dark.Text} />
                    <TextInput style={styles.input} numberOfLines={1}/>
                </View>

                <View style={styles.content}>

                    <LeaguesSection 
                        text='Favoritas'
                        leagues={[
                            {
                                id: '71',
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
                            IconComponent: Entypo,
                            name: 'star',
                            size: 30,
                            style: styles.starIcon,
                            darkColor: Colors.dark.Red,
                            lightColor: Colors.light.Red
                        }}
                    />

                    <ThemedText style={{textAlign: "center", marginBottom: 30}}>
                        Favorite uma liga para que ela apareça aqui.
                    </ThemedText>

                    <LeaguesSection 
                        text='Principais'
                        icon={{
                            IconComponent: FontAwesome5,
                            name: 'crown',
                            size: 24,
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
                            }
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
        width: windowWidth * 0.9,
        height: 42,
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.dark.LighterBackground,
        borderColor: "#000000",
        borderWidth: 0.7,
        borderRadius: 14,
        paddingLeft: 10,
        paddingRight: 10
    },
    input: {
        color: Colors.dark.Text,
        flex: 1,
        height: "80%",
        paddingLeft: 5,
        paddingRight: 5,
    },
    content: {
        top: 30,
        width: windowWidth*0.86,
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 100
    },
    starIcon: {
        marginTop: 0,
        paddingRight: 12
    },
    crownIcon: {
        marginTop: 4.5,
        paddingRight: 12
    }
});