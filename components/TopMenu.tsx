import { ThemedText } from "./DefaultComponents/ThemedText";
import { ThemedView } from "./DefaultComponents/ThemedView";
import { StyleSheet, Image, Dimensions, View } from 'react-native';
import { Colors } from "@/constants/Colors"

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface MenuParams {
    type: "back" | "image"
    text: string
}

export default function TopMenu({type, text}: MenuParams) {
    return (
        <ThemedView style={styles.menu} darkColor={Colors.dark.DarkBackground} lightColor={Colors.light.DarkBackground}>

            <View style={styles.leftInfo}>
                {type == 'image' && <Image source={require("@/assets/images/RedLogo.png")} style={styles.logo} resizeMode="contain"/>}
                <ThemedText style={styles.pageText} darkColor={Colors.dark.White} lightColor={Colors.light.White}>
                    {text}
                </ThemedText>
            </View>

            <View style={styles.rightInfo}>
                <Image source={require("@/assets/images/UserIcon.png")} style={styles.userImage} resizeMode="contain"/>
            </View>

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
        height: 80,
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
        fontFamily: "Kdam",
        fontSize: 24
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