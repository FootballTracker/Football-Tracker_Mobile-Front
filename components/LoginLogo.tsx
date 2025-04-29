//Default Imports
import { View } from "react-native";
import { StyleSheet, Dimensions } from "react-native";

//Components
import { ThemedText } from "./DefaultComponents/ThemedText";
import { ThemedImage } from "./DefaultComponents/ThemedImage";

//Consts
const windowWidth = Dimensions.get('window').width;

export default function LoginLogo() {
    return (
        <View style={{alignItems: 'center'}}>
            <ThemedText style={{fontSize: 40}}>FOOTBALL</ThemedText>
            <ThemedImage source={{light: require("@/assets/images/GreenBlackLogo.png"), dark: require("@/assets/images/GreenWhiteLogo.png")}} style={styles.logo} />
            <ThemedText style={{fontSize: 25}}>TRACKER</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        // width: windowWidth * 0.52,
        height: windowWidth * 0.52,
        maxHeight: 300,
        minHeight: 100,
    },
    text: {
        fontSize: 60,
    },
});