import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { TabView, SceneMap } from 'react-native-tab-view';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg'

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import LoadingIcon from '@/components/LoadingIcon';

//scenes to render
import JogadorPerfil from '@/components/players/pageComponents/JogadorPerfil';
import JogadorEstatisticas from '@/components/players/pageComponents/JogadorEstatisticas';

export default function Player() {
    const { playerId } = useLocalSearchParams();
    
    const [contentLoaded, setContentLoaded] = useState(false);
    
    const [favoritieState, setFavoritieState] = useState(false);
    
    const [index, setIndex] = useState(0);
    
    //routes to render
    const [routes] = useState([
        { key: 'perfil', title: 'Perfil' },
        { key: 'estatisticas', title: 'Estatísticas' },
    ]);

    const renderScene = SceneMap({
        perfil: JogadorPerfil,
        estatisticas: JogadorEstatisticas,
    });

    useEffect(() => {
        //fazer requisição para o back

        setContentLoaded(true);
    }, []);


    const changeFavoritie = () => {
        // alert("trocar favorito");
        setFavoritieState(!favoritieState);
    }

    return (

        contentLoaded ? (
            <ThemedView style={styles.background}>
                <ThemedText style={{textAlign: "center"}}>Info geral</ThemedText>
                
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props => (
                        <CustomTabBar {...props} />
                    )}
                    style={{
                        top: 25
                    }}
                    lazy
                    renderLazyPlaceholder={() => (
                        <LoadingIcon />
                    )}
                />
            </ThemedView>
        ) : (
            <View >
                <ThemedText>Loading</ThemedText>
            </View>
        )

    );
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
        flex: 1
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative"
    },
    teamImage: {
        width: 55,
        height: 45,
        marginRight: 5
    },
    star: {
        marginTop: -2,
        paddingLeft: 3,
        paddingRight: 3
    }
});