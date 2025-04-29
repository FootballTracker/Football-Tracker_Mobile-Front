import { StyleSheet, Dimensions, TextInput, View } from 'react-native';
import { Text } from 'react-native';

import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { Colors } from '@/constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Main() {

    return (
        <ThemedView lightColor={Colors.light.LightBackground} darkColor={Colors.light.LightBackground} style={styles.background}>
            <View style={styles.searchBar}>
            <EvilIcons name="search" size={24} color={Colors.dark.White}/>
            <TextInput style={styles.input} numberOfLines={1}/>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        minHeight: windowHeight
    },
    searchBar: {
        width: windowWidth * 0.9,
        height: 50,
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
        color: Colors.dark.White,
        flex: 1,
        height: "80%",
        paddingLeft: 5,
        paddingRight: 5,
    }
});