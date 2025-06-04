//Default Imports
import { StyleSheet, Dimensions, View } from "react-native";

//Components
import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedImage } from "./DefaultComponents/ThemedImage";

//Consts
const windowWidth = Dimensions.get('window').width;

export default function LoginLogo() {
    return (
        <View style={{alignItems: 'center', top: -9}}>
            <ThemedText style={[{fontSize: 45, top: 9}, styles.text]}>FOOTBALL</ThemedText>
            <ThemedImage
                source={{
                    light: require("@/assets/images/GreenBlackLogo.png"),
                    dark: require("@/assets/images/GreenWhiteLogo.png"),
                }}
                style={styles.logo}
            />
            <ThemedText style={[{fontSize: 25}, styles.text]}>TRACKER</ThemedText>
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
        fontFamily: 'Koulen',
    },
});