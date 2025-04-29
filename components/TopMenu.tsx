import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from "./DefaultComponents/ThemedText";
import { ThemedView } from "./DefaultComponents/ThemedView";
import { ThemedImage } from './DefaultComponents/ThemedImage';
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
                    {image && <ThemedImage 
                        source={{
                                light: require("@/assets/images/RedBlackLogo.png"),
                                dark: require("@/assets/images/RedWhiteLogo.png")
                            }}
                            style={styles.logo}
                        />
                    }
                    <ThemedText style={styles.pageText} darkColor={Colors.dark.Text} lightColor={Colors.light.Text}>
                        {text}
                    </ThemedText>
                </View>
                
                
                <TouchableOpacity onPress={() => router.navigate("/Login")}>
                    <ThemedImage 
                        source={{
                            light: require("@/assets/images/DarkUserIcon.png"),
                            dark: require("@/assets/images/LightUserIcon.png")
                        }}
                        style={styles.userImage}
                    />
                </TouchableOpacity>
                
                

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
    userImage: {
        width: 60,
        height: 35,
        marginRight: 5
    }
});