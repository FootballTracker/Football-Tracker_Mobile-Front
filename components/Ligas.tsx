import { StyleSheet, Dimensions } from 'react-native';

import { ThemedText } from "./DefaultComponents/ThemedText";
import { ThemedView } from "./DefaultComponents/ThemedView";
import { Colors } from "@/constants/Colors";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Ligas() {
    return (
            <ThemedView style={styles.menu} darkColor={Colors.dark.DarkBackground} lightColor={Colors.light.DarkBackground}>
                
                <ThemedText>Ligas</ThemedText>
                
            </ThemedView>
            
    );
}

const styles = StyleSheet.create({
    menu: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: windowWidth+2,
        height: 120,
        paddingTop: 40,
        left: -1,
        top: -1,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderWidth: 0.5,
        borderColor: Colors.dark.Red
    },
    leftInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5
    },
    pageText: {
        fontSize: 24,
        fontFamily: "Kdam",
    },
    logo: {
        width: 60,
        height: 40,
    },
    rightInfo: {
        marginRight: 5
    },
    userImage: {
        width: 60,
        height: 35,
    }
});