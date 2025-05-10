import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { TabView, SceneMap } from 'react-native-tab-view';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import UnfilledStar from '@/assets/Icons/UnfilledStar.svg'

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedIcon } from '@/components/DefaultComponents/ThemedIcon';
import { Select } from '@/components/Select';
import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';

//scenes to render
import TimeInfo from '@/components/teams/pagesComponents/TimeInfo';
import TimeEquipe from '@/components/teams/pagesComponents/TimeEquipe';
import TimeClassificacao from '@/components/teams/pagesComponents/TimeClassif';
import LoadingIcon from '@/components/LoadingIcon';

export default function Team() {
    const { teamId } = useLocalSearchParams();
    
    const [contentLoaded, setContentLoaded] = useState(false);
    
    const [favoritieState, setFavoritieState] = useState(false);
    
    const [index, setIndex] = useState(0);
    
    //routes to render
    const [routes] = useState([
        { key: 'informacoes', title: 'Informações' },
        { key: 'equipe', title: 'Equipe' },
        { key: 'classificacao', title: 'Classificação' },
    ]);

    const renderScene = SceneMap({
        informacoes: TimeInfo,
        equipe: TimeEquipe,
        classificacao: TimeClassificacao,
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
                <View style={styles.header}>
                    <Image source={{uri: "https://media.api-sports.io/football/teams/119.png"}} style={styles.teamImage} resizeMode='contain'/>
                    <ThemedText style={{fontSize: 19, fontFamily: "Kdam", marginRight: 6}}>
                        Internacional
                    </ThemedText>
                    <TouchableOpacity onPress={changeFavoritie}>
                        <ThemedIcon
                            IconComponent={favoritieState ? FilledStar : UnfilledStar}
                            darkColor={Colors.dark.Red}
                            lightColor={Colors.light.Red}
                            style={styles.star}
                            height={24}
                            width={24}
                        />
                    </TouchableOpacity>
                </View>
                
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