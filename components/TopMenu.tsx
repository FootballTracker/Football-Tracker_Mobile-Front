import { StyleSheet, Image, Dimensions, View, DimensionValue } from 'react-native';

import { ThemedText } from "./DefaultComponents/ThemedText";
import { ThemedView } from "./DefaultComponents/ThemedView";
import { Colors } from "@/constants/Colors";

const windowWidth = Dimensions.get('window').width;

interface MenuParams {
    image: boolean
    text: string
}

export default function TopMenu({ image, text }: MenuParams) {
    return (
        <ThemedView darkColor={Colors.dark.LightBackground} lightColor={Colors.light.LightBackground}>
            <ThemedView style={styles.menu} darkColor={Colors.dark.DarkBackground} lightColor={Colors.light.DarkBackground}>
                
                <View style={styles.leftInfo}>
                    {image && <Image source={require("@/assets/images/RedLogo.png")} style={styles.logo} resizeMode="contain"/>}
                    <ThemedText style={styles.pageText} darkColor={Colors.dark.White} lightColor={Colors.light.White}>
                        {text}
                    </ThemedText>
                </View>

                <View style={styles.rightInfo}>
                    <Image source={require("@/assets/images/UserIcon.png")} style={styles.userImage} resizeMode="contain"/>
                </View>
                

            </ThemedView>
        </ThemedView>
            
    );
}

const styles = StyleSheet.create({
    menu: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: windowWidth+2,
        height: 70,
        left: -1,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderWidth: 0.5,
        borderColor: Colors.dark.Red,
        borderTopWidth: 0,
        zIndex: 10
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