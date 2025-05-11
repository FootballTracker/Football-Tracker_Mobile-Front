import { StyleSheet, Dimensions, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { MatchCardI } from '@/components/matches/MatchCard';
import { formatDateToBR } from '@/lib/format';

import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { PickRound } from '@/components/PickRound';
import MatchSection from '@/components/matches/MatchSection';
import LoadingIcon from '@/components/LoadingIcon';


const windowWidth = Dimensions.get('window').width;

interface LigaPartidasProps {
    round: number
    setRound: React.Dispatch<React.SetStateAction<number>>
    matches?: MatchesI[]
}

export interface MatchesI {
    day: string
    matches: MatchCardI[]
}

export default function LigaPartidas({ round, setRound, matches } : LigaPartidasProps) {

    const rounds = Array.from({ length: 38 }, (_, i) => ({
        name: `${i + 1}`,
        value: `${i + 1}`
    }));

    return (
        <ThemedScrollView style={{top: 25}}>
            <PickRound
                values={rounds}
                selected={round}
                setSelected={setRound}
            />

            <View style={styles.content}>
                { matches && matches.length ?
                    matches.map((values, index) => (
                        <MatchSection
                            icon={{
                                IconComponent: MaterialCommunityIcons,
                                name: "calendar-text",
                                style: styles.calendarIcon,
                                darkColor: Colors.dark.Red,
                                lightColor: Colors.light.Red,
                                size: 28
                            }}
                            matches={values.matches}
                            text={formatDateToBR(values.day)}
                            key={index}
                        />
                    ))
                :
                    <View>
                        <LoadingIcon />
                    </View> 
                }
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
    calendarIcon: {
        marginTop: 1,
        marginHorizontal: 5
    },
});