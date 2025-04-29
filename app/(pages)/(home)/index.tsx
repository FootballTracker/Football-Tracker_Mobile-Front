import { StyleSheet, Dimensions, TextInput, View, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { Colors } from '@/constants/Colors';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { ThemedText } from '@/components/DefaultComponents/ThemedText';
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Main() {

    return (
        <ScrollView>
            <ThemedView lightColor={Colors.light.LightBackground} darkColor={Colors.dark.LightBackground} style={styles.background}>
                <View style={styles.searchBar}>
                    <EvilIcons name="search" size={24} color={Colors.dark.Text}/>
                    <TextInput style={styles.input} numberOfLines={1}/>
                </View>

                <View style={styles.content}>
                    <View style={styles.section}>
                        <View style={styles.titleSection}>
                            <ThemedIcon IconComponent={Entypo} name='star' size={27} style={styles.titleIcon} darkColor={Colors.dark.Red} lightColor={Colors.light.Red}/>
                            {/* <Entypo name="star-outlined" size={24} color="black" /> */}
                            <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={styles.sectionTitle}>
                                Favoritas
                            </ThemedText>
                        </View>
                        <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.titleSection}>
                            <ThemedIcon IconComponent={FontAwesome5} name='crown' size={21} style={styles.leaguesIcon} darkColor={Colors.dark.Red} lightColor={Colors.light.Red}/>
                            <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={styles.sectionTitle}>
                                Principais
                            </ThemedText>
                        </View>
                        <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>
                    </View>
                </View>

            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        minHeight: windowHeight
    },
    searchBar: {
        width: windowWidth * 0.9,
        height: 42,
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
        color: Colors.dark.Text,
        flex: 1,
        height: "80%",
        paddingLeft: 5,
        paddingRight: 5,
    },
    content: {
        top: 30,
        width: windowWidth*0.86,
        marginLeft: "auto",
        marginRight: "auto"
    },
    section: {

    },
    titleSection: {
        display: "flex",
        flexDirection: "row",
    },
    sectionTitle: {
        fontFamily: "Kdam",
        fontSize: 21,
    },
    titleIcon: {
        marginTop: 1.5,
        paddingRight: 5
    },
    divisor: {
        height: 1,
    },
    leaguesIcon: {
        marginTop: 5,
        paddingRight: 5
    }
});