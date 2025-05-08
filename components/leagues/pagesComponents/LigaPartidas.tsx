import { StyleSheet, Dimensions, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { useState } from 'react';
import { PickRound } from '@/components/PickRound';
import MatchSection from '@/components/matches/MatchSection';

const windowWidth = Dimensions.get('window').width;

export default function LigaPartidas() {

    const [round, setRound] = useState(23);

    return (
        <ThemedScrollView style={{top: 25}}>
            <PickRound
                values={[
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '7', value: '7' },
                    { name: '8', value: '8' },
                    { name: '9', value: '9' },
                    { name: '10', value: '10' },
                    { name: '11', value: '11' },
                    { name: '12', value: '12' },
                    { name: '13', value: '13' },
                    { name: '14', value: '14' },
                    { name: '15', value: '15' },
                    { name: '16', value: '16' },
                    { name: '17', value: '17' },
                    { name: '18', value: '18' },
                    { name: '19', value: '19' },
                    { name: '20', value: '20' },
                    { name: '21', value: '21' },
                    { name: '22', value: '22' },
                    { name: '23', value: '23' },
                    { name: '24', value: '24' },
                    { name: '25', value: '25' },
                    { name: '26', value: '26' },
                    { name: '27', value: '27' },
                    { name: '28', value: '28' },
                    { name: '29', value: '29' },
                    { name: '30', value: '30' },
                    { name: '31', value: '31' },
                    { name: '32', value: '32' },
                    { name: '33', value: '33' },
                    { name: '34', value: '34' },
                    { name: '35', value: '35' },
                    { name: '36', value: '36' },
                    { name: '37', value: '37' },
                    { name: '38', value: '38' }
                ]}
                selected={round}
                setSelected={setRound}    
            />

            <View style={styles.content}>
                <MatchSection
                    icon={{
                        IconComponent: MaterialCommunityIcons,
                        name: "calendar-text",
                        style: styles.calendarIcon,
                        darkColor: Colors.dark.Red,
                        lightColor: Colors.light.Red,
                        size: 28
                    }}
                    matches={[{
                        id: '1',
                        scoreHome: '0',
                        scoreOut: '1',
                        teamHomeImage: 'https://media.api-sports.io/football/teams/1062.png',
                        teamHomeName: 'Atlético MG',
                        teamOutImage: 'https://media.api-sports.io/football/teams/151.png',
                        teamOutName: 'Goiás',
                        time: "17:30"
                    }]}
                    text='20/08/2022'
                />
            </View>

        </ThemedScrollView>
    )
}


const styles = StyleSheet.create({
    content: {
        width: windowWidth*0.86,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 25
    },
    calendarIcon: {
        marginTop: 1,
        marginHorizontal: 5
    },
});