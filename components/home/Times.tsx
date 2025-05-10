import { StyleSheet, Dimensions, View  } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import { Colors } from '@/constants/Colors';

import TeamSection from '@/components/teams/TeamSection';
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { ThemedInput } from '@/components/DefaultComponents/ThemedInput';

const windowWidth = Dimensions.get('window').width;

export default function Times() {
    return (
        <ThemedScrollView style={styles.background}>
            <ThemedInput isSearch={true} numberOfLines={1} style={styles.searchBar} />

            <View style={styles.content}>

                <TeamSection 
                    text='Favorito'
                    teams={[
                        {
                            id: '119',
                            image: "https://media.api-sports.io/football/teams/119.png",
                            name: "Internacional",
                            favoritie: true
                        },
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

                <TeamSection 
                    text='Principais'
                    icon={{
                        IconComponent: FontAwesome5,
                        name: 'crown',
                        size: 20,
                        style: styles.crownIcon,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red
                    }}
                    teams={[
                        {
                            id: '85',
                            image: "https://media.api-sports.io/football/teams/85.png",
                            name: "Paris Saint Germain",
                            favoritie: false
                        },
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '85',
                            image: "https://media.api-sports.io/football/teams/85.png",
                            name: "Paris Saint Germain",
                            favoritie: false
                        },
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '85',
                            image: "https://media.api-sports.io/football/teams/85.png",
                            name: "Paris Saint Germain",
                            favoritie: false
                        },
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '85',
                            image: "https://media.api-sports.io/football/teams/85.png",
                            name: "Paris Saint Germain",
                            favoritie: false
                        },
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        },
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
                            favoritie: false
                        }, 
                        {
                            id: '505',
                            image: "https://media.api-sports.io/football/teams/505.png",
                            name: "Inter",
                            favoritie: false
                        }, 
                        {
                            id: '529',
                            image: "https://media.api-sports.io/football/teams/529.png",
                            name: "Barcelona",
                            favoritie: false
                        }, 
                        {
                            id: '42',
                            image: "https://media.api-sports.io/football/teams/42.png",
                            name: "Arsenal",
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