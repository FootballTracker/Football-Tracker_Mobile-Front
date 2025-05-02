import { StyleSheet, View, TouchableOpacity } from 'react-native';
import type { TabBarProps } from 'react-native-tab-view';
import { Colors } from '@/constants/Colors';

import { ThemedText } from "@/components/DefaultComponents/ThemedText";

export const CustomTabBar: React.FC<TabBarProps<any>> = ({ navigationState, jumpTo }) => {
    return (
      <View style={styles.tabBar}>
        {navigationState.routes.map((route, index) => {
          const isFocused = navigationState.index === index;
          const isLast = index === navigationState.routes.length - 1;
  
          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabItem, isFocused && styles.activeTab, isLast && styles.lastTabItem]}
              onPress={() => jumpTo(route.key)}
            >
              <ThemedText style={[styles.tabText, isFocused && styles.activeText]}>
                {route.title}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: "100%",
      },
      tabItem: {
        flex: 1,
        paddingTop: 1,
        paddingBottom: 1,
        alignItems: 'center',
        borderRightWidth: 0.3,
        borderColor: Colors.dark.DarkerText,
      },
      lastTabItem: {
        borderRightWidth: 0,
      },
      activeTab: {
        
      },
      tabText: {
        color: Colors.dark.DarkerText,
        fontFamily: "Kokoro",
        fontSize: 14,
        lineHeight: 14
      },
      activeText: {
        color: Colors.dark.Red,
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 1,
        borderBottomWidth: 3,
        borderBottomColor: Colors.dark.Red,
      },
});