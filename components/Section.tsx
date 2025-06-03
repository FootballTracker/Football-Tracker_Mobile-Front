//Default Imports
import { LinearTransition } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

//Components
import { ThemedIcon, ThemedIconProps } from "./DefaultComponents/ThemedIcon";
import { ThemedText } from "./DefaultComponents/ThemedText";
import { ThemedView } from "./DefaultComponents/ThemedView";
import { View, ViewProps } from "react-native";
import Animated from "react-native-reanimated";

//Type
type SectionProps = ViewProps & {
    icon: ThemedIconProps;
    text: string;
    children?: React.ReactNode;
    iconUp?: boolean;
}

export default function Section({ icon, text, children, iconUp = false, ...rest } : SectionProps) {
    return (
        <Animated.View layout={LinearTransition.delay(0).duration(200)} style={[styles.section, rest.style]}>
            <View style={styles.titleSection}>
                <ThemedIcon {...icon} darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={iconUp && {marginTop: -3.5}} />
                <ThemedText lightColor={Colors.light.Text} darkColor={Colors.dark.Text} style={styles.sectionTitle}>
                    {text}
                </ThemedText>
            </View>
            <ThemedView darkColor={Colors.dark.Red} lightColor={Colors.light.Red} style={styles.divisor}/>

            
            <View style={styles.content}>
                {children}

                {/* <ThemedText style={styles.favoritesInfoText} darkColor={Colors.dark.DarkerText} lightColor={Colors.light.DarkerText}>
                    <ThemedIcon IconComponent={Feather} name="info" size={15} darkColor={Colors.dark.DarkerText} lightColor={Colors.light.DarkerText} />
                    {' '}
                    Nenhum dado para exibir.
                    </ThemedText> */}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    section: {
        marginVertical: 20,
        width: '90%',
        marginHorizontal: 'auto',
    },
    titleSection: {
        display: "flex",
        alignItems: 'center',
        gap: 5,
        flexDirection: "row",
        paddingBottom: 1,
    },
    sectionTitle: {
        fontFamily: "Kdam",
        fontSize: 18,
    },
    divisor: {
        height: .4,
    },
    content: {
        marginTop: 15,
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,
        minHeight: 30,
    }
});