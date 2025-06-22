import { View, Dimensions, Animated } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useMatch } from '@/context/MatchContext';
import { useState } from 'react';

import { CustomTabBar } from '@/components/CustomTabBar';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import LoadingIcon from '@/components/LoadingIcon';

//scenes to render
import MatchInfo from '@/components/matches/pageComponents/MatchInfo';
import MatchStatistcs from '@/components/matches/pageComponents/MatchStatistcs';
import MatchEvents from '@/components/matches/pageComponents/MatchEvents';
import MatchLineup from '@/components/matches/pageComponents/MatchLineup';

export default function Match() {
    const { match, index, setIndex, animatedStyles } = useMatch();
    
    //routes to render
    const [routes] = useState([
        { key: 'informacoes', title: 'Informações' },
        { key: 'estatisticas', title: 'Estatísticas' },
        { key: 'eventos', title: 'Eventos' },
        { key: 'escalacoes', title: 'Escalações' },
    ]);

    const renderScene = ({ route }: any) => {
        if(!match) return;

        switch (route.key) {
            case 'informacoes':
                return <MatchInfo {...match.info}/>;
            case 'estatisticas':
                return <MatchStatistcs match={match.match} home_team={match.statistics ? match.statistics.home_team : undefined} away_team={match.statistics ? match.statistics.away_team : undefined} />;
            case 'eventos':
                return <MatchEvents match={match.match} />;
            case 'escalacoes':
                return <MatchLineup match={match.match}/>;
            default:
                return null;
        }
    };

    return (
        <ThemedView style={{flex: 1}}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={props => (
                    <CustomTabBar {...props} />
                )}
                lazy
                lazyPreloadDistance={1}
                renderLazyPlaceholder={() => (
                    <View style={{height: 500, width: "100%"}}>
                        <LoadingIcon />
                    </View>
                    )
                }
            />
        </ThemedView>
    );
}