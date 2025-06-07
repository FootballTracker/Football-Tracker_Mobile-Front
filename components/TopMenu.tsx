import { StyleSheet, Dimensions, View, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { usePathname } from 'expo-router';
import { usePage } from '@/context/PageContext';
import { Colors } from "@/constants/Colors";
import { useUserContext } from '@/context/UserContext';
import Configs from '@/assets/Icons/Configs.svg'

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from "./DefaultComponents/ThemedView";
import { ThemedImage } from './DefaultComponents/ThemedImage';
import { ThemedIcon } from './DefaultComponents/ThemedIcon';
import { useEffect, useState } from 'react';
import { ReturnArrow } from './ReturnArrow';

const windowWidth = Dimensions.get('window').width;

export default function TopMenu() {
    const pathname = usePathname();
    const [showBackButton, setShowBackButton] = useState(false);
    const { user, imageVersion } = useUserContext();
    const { page, setPage, isOnUserPages, userPages } = usePage();

    const handleProfileClick = () => {
        if(user) {
            router.navigate("/(pages)/Profile");
        } else {
            router.navigate("/(auth)/Login");
        }
    }

    const handleConfigsClick = () => {
        router.navigate("/(pages)/userConfigurations/Configurations");
        setPage("Configurações");
    }

    useEffect(() => {
        if(pathname === "/") setShowBackButton(false);
        else setShowBackButton(true);
    }, [pathname])

    return (
        <ThemedView colorName='LightBackground'>
            <ThemedView style={styles.menu} colorName='DarkBackground'>
                
                <View style={styles.leftInfo}>
                    {
                        showBackButton ? (
                            <ReturnArrow />
                        ) : ( 
                            <ThemedImage 
                                source = {{
                                    light: require("@/assets/images/RedBlackLogo.png"),
                                    dark: require("@/assets/images/RedWhiteLogo.png")
                                }}
                                style={styles.logo}
                            />
                        )
                    }
                    <ThemedText style={styles.pageText} darkColor={Colors.dark.Text} lightColor={Colors.light.Text}>
                        {page}
                    </ThemedText>
                </View>
                
                
                {
                    isOnUserPages ? ( //Is on profile area
                        page === userPages?.Profile ? (
                            <TouchableOpacity onPress={handleConfigsClick}>
                                <ThemedIcon IconComponent={Configs} width={60} height={35} style={{marginRight: 5}} />
                            </TouchableOpacity>
                        ) : null
                    ) : (
                        <TouchableOpacity onPress={handleProfileClick}>
                            {user?.image ?
                                <Image
                                    source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}user/${user?.id}/image?${imageVersion}` }}
                                    style={[{borderRadius: 100, resizeMode: 'contain', width: 35, height: 35, marginRight: 20}]}
                                />
                            :
                                <ThemedImage 
                                    source={{
                                        light: require("@/assets/images/DarkUserIcon.png"),
                                        dark: require("@/assets/images/LightUserIcon.png")
                                    }}
                                    style={styles.userImage}
                                />
                            }
                            
                        </TouchableOpacity>
                    )
                }

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
        height: 65,
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
        fontSize: 22,
        // fontFamily: "Kdam",
    },
    logo: {
        width: 57,
        height: 37,
    },
    userImage: {
        width: 60,
        height: 35,
        marginRight: 5
    }
});