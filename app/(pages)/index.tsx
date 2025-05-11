import { StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { usePage } from '@/context/PageContext';

import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { Menu } from '@/components/home/Menu';
import LoadingIcon from '@/components/LoadingIcon';

//scenes to render
import Ligas from '@/components/home/Ligas';
import Times from '@/components/home/Times';
import Jogadores from '@/components/home/Jogadores';

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
        times: Times,
        ligas: Ligas,
        jogadores: Jogadores,
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
                    <LoadingIcon />
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