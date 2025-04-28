import BottomMenu from '@/components/BottomMenu';
import TopMenu from '@/components/TopMenu';
import { StyleSheet } from 'react-native';

export default function Main() {

    return (
        <>
            <TopMenu text='Ligas' type='image'/>
            <BottomMenu />
        </>
    )
}

const styles = StyleSheet.create({
    pageText: {
        fontFamily: "Kdam",
        fontSize: 40
    }
});