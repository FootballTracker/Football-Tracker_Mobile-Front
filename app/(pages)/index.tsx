import { StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { usePage } from '@/context/PageContext';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { Menu } from '@/components/home/Menu';

//scenes to render
import LigasTeste from '@/components/home/Ligas';
import TimesTeste from '@/components/home/Times';
import JogadoresTeste from '@/components/home/Jogadores';
import Perfil from '@/app/(pages)/Perfil';


export default function Main() {
    
    const [index, setIndex] = useState(1);
    const { setPage } = usePage();
    
    //routes to render
    const [routes] = useState([
        { key: 'times', title: 'Times' },
        { key: 'ligas', title: 'Ligas' },
        { key: 'jogadores', title: 'Jogadores' },
    ]);

    const renderScene = SceneMap({
        times: TimesTeste,
        ligas: LigasTeste,
        jogadores: JogadoresTeste,
    });

    const handleIndexChange = (i: number) => {
        setIndex(i);
        setPage(routes[i].title);
    };

    return (
        <ThemedView style={styles.background}>
            <TabView
                tabBarPosition='bottom'
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={handleIndexChange}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={props => (
                    <Menu {...props} />
                )}
                lazy
                renderLazyPlaceholder={() => (
                    <ThemedView style={{flex: 1, height: Dimensions.get('window').height}}>
                        <ThemedText>Loading...</ThemedText>
                    </ThemedView>
                )}
            />
        </ThemedView>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    }
});