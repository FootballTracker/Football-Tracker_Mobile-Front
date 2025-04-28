import { StyleSheet, Dimensions, Text } from 'react-native';
import { useState } from 'react';


import BottomMenu from '@/components/BottomMenu';
import TopMenu from '@/components/TopMenu';
import { ThemedView } from '@/components/DefaultComponents/ThemedView';
import { Colors } from '@/constants/Colors';
import Ligas from '@/components/Ligas';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Main() {

    const [page, setPage] = useState("Ligas");

    return (
        <ThemedView lightColor={Colors.light.LightBackground} darkColor={Colors.light.LightBackground} style={styles.background}>
            <TopMenu text={page} type='image'/>
            <BottomMenu setText={setPage}/>
            
            {page === "Ligas" && <Ligas />}
            
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    background: {
        height: windowHeight
    }
});