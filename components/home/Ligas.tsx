//Default Imports
import { useItemsContext } from '@/context/ItemsContext';
import { useUserContext } from '@/context/UserContext';
import { useState } from 'react';
import { StyleSheet, View  } from 'react-native';
import { router } from 'expo-router';
import api from '@/lib/Axios';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { FavoriteLeagues, MainLeagues } from '../Items';
import LoadingIcon from '../LoadingIcon';
import SearchBar from './SearchBar';
import Section from '../Section';
import Card from '../Card';

//Icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'
import { Toast } from 'toastify-react-native';
import InfoMessage from '../InfoMessage';

//Type
export type league = {
    id: string
    logo_url: string
    name: string
    is_favorite: boolean
    show: boolean
    api_id: string
}

export default function Ligas() {
    const { loading, getLeagues } = useItemsContext();
    const { user } = useUserContext();
    const [clearInput, setClearInput] = useState(false);
    const [searchedLeagues, setSearchedLeagues] = useState<league[]>([]);
    const [showSearched, setShowSearched] = useState(false);
    const [searching, setSearching] = useState(false);

    async function searchLeagues(text: string) {
        if(text) {
            setSearching(true);
            await api.get("leagues", {
                params: {
                    user_id: user?.id,
                    text: text
                }
            }).then((response) => {
                setSearchedLeagues(response.data.all_leagues);
                setShowSearched(true);
            }).catch((error) => {
                const errorMessage = error.response.data.detail || "Erro ao buscar ligas"
                Toast.show({
                    props: {
                        type: "error",
                        text: errorMessage
                    }
                })
            }).finally(() =>{
                setSearching(false);
            })
        } else {
            setSearchedLeagues([]);
            setShowSearched(false);
        }
    }

    async function refresh() {
        await getLeagues();
        setClearInput(prev => !prev);
        setSearchedLeagues([]);
        setShowSearched(false);
    }
    
    return (
        !loading ? (
            <ThemedScrollView style={styles.background} getData={refresh}>
                <SearchBar handleSearch={searchLeagues} clearInputState={clearInput}/>

                {searching ? (
                    <View style={{marginTop: 30}}>
                        <LoadingIcon />
                    </View>
                ) : (
                    showSearched ? (
                        searchedLeagues.length ? (
                            <Section text={`${searchedLeagues.length} liga(s) encontradas`} >
                                {searchedLeagues.map((league, index) => (
                                    <Card
                                        favorite={league.is_favorite}
                                        handleOpen={() => router.push(`/(pages)/league/${league.id}` as any)}
                                        info={league.name}
                                        image={league.logo_url}
                                        show={league.show}
                                        key={index}
                                    />
                                ))}
                            </Section>
                        ) : (
                            <InfoMessage text="Nenhuma liga encontrada" style={{marginHorizontal: "auto", marginTop: 30}}/>
                        )
                    ) : (
                        <>
                            <Section text='Favoritas' icon={{IconComponent: FilledStar, width: 27, height: 27}} iconUp >
                                <FavoriteLeagues />
                            </Section>

                            <Section text='Principais' icon={{IconComponent: FontAwesome5, name: 'crown', size: 20}} style={{marginBottom: 50}} iconUp >
                                <MainLeagues />
                            </Section>
                        </>
                    )
                )}
                
            </ThemedScrollView>
        ) : (
            <LoadingIcon />
        )
        
        
    )
}

const styles = StyleSheet.create({
    background: {
        paddingTop: 25,
    },
    starIcon: {
        marginTop: 2,
        marginRight: 5
    },
    crownIcon: {
        marginTop: 5,
        marginRight: 8
    }
});