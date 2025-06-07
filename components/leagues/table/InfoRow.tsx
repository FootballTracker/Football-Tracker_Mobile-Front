//Default Imports
import { StyleSheet } from 'react-native';

//Components
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import { View } from 'react-native';

//Icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//Type
type InfoRowProps = {
    infoName: string,
    info: string,
}

export default function InfoRow({ infoName, info } : InfoRowProps) {
    return (
        <View style={styles.infoBox}>
            <View style={styles.leftInfo}>
                <ThemedIcon IconComponent={MaterialCommunityIcons} name='subdirectory-arrow-right' colorName='DarkerText' size={22} />
                <ThemedText style={styles.text}>{infoName}:</ThemedText>
            </View>

            <ThemedText style={[styles.text, {width: 25}]}>{info}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    infoBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
    },
    leftInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    text: {
        fontSize: 13,
        textAlign: 'center'
    }
});