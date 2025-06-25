//Default Imports
import { useItemsContext } from '@/context/ItemsContext';
import { useUserContext } from '@/context/UserContext';
import { useState } from 'react';
import { StyleSheet, View  } from 'react-native';
import { router } from 'expo-router';
import { Toast } from 'toastify-react-native';
import api from '@/lib/Axios';

//Components
import { ThemedScrollView } from '@/components/DefaultComponents/ThemedScrollView';
import { FavoritePlayers, MainPlayers } from '../Items';
import InfoMessage from '../InfoMessage';
import LoadingIcon from '../LoadingIcon';
import SearchBar from './SearchBar';
import Section from '../Section';
import Card from '../Card';

//Icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FilledStar from '@/assets/Icons/FilledStar.svg'

//Type
export type player = {
    id: string,
    name: string,
    is_favorite: boolean,
    photo: string,
    show: boolean,
}

export default function Jogadores() {
    const { loading, getPlayers } = useItemsContext();
    const { user, logged } = useUserContext();
    const [clearInput, setClearInput] = useState(false);
    const [searchedPlayers, setSearchedPlayers] = useState<player[]>([]);
    const [showSearched, setShowSearched] = useState(false);
    const [searching, setSearching] = useState(false);

    async function searchPlayers(text: string) {
        if(text) {
            setSearching(true);
            await api.get("players", {
                params: {
                    user_id: user?.id,
                    text: text
                }
            }).then((response) => {
                setSearchedPlayers(response.data.all_players);
                setShowSearched(true);
            }).catch((error) => {
                const errorMessage = error.response.data.detail || "Erro ao buscar jogadores"
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
            setSearchedPlayers([]);
            setShowSearched(false);
        }
    }

    async function refresh() {
        await getPlayers();
        setClearInput(prev => !prev);
        setSearchedPlayers([]);
        setShowSearched(false);
    }

    return (
        !loading ? (
            <ThemedScrollView style={styles.background} getData={refresh}>
                <SearchBar handleSearch={searchPlayers} clearInputState={clearInput} minLength={3}/>

                {searching ? (
                    <View style={{marginTop: 30}}>
                        <LoadingIcon />
                    </View>
                ) : (
                    showSearched ? (
                        searchedPlayers.length ? (
                            <Section text={`${searchedPlayers.length} jogador(es) encontrado(s)`} style={{marginBottom: 35}}>
                                {searchedPlayers.map((player, index) => (
                                    <Card
                                        favorite={player.is_favorite}
                                        handleOpen={() => router.push(`/(pages)/player/${player.id}` as any)}
                                        info={player.name}
                                        image={player.photo}
                                        show={player.show}
                                        key={index}
                                    />
                                ))}
                            </Section>
                        ) : (
                            <InfoMessage text="Nenhum jogador encontrado" style={{marginHorizontal: "auto", marginTop: 30}}/>
                        )
                    ) : (
                        <>
                            {logged &&
                                <Section text='Favoritos' icon={{IconComponent: FilledStar, width: 27, height: 27}} iconUp >
                                    <FavoritePlayers />
                                </Section>
                            }

                            <Section text={logged ? 'Principais' : 'Jogadores Principais'} icon={{IconComponent: FontAwesome5, name: 'crown', size: 20}} style={{marginBottom: 50}} iconUp >
                                <MainPlayers />
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
});