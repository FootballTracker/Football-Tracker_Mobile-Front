//Default Importws
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useUserContext } from './UserContext';
import { Toast } from 'toastify-react-native';
import { item } from '@/constants/Favorites'
import api from '@/lib/Axios';

//Type imports
import { player } from '@/components/home/Jogadores'
import { league } from '@/components/home/Ligas';
import { team } from '@/components/home/Times';

//Type
type ItemsContextType<T extends item> = {
    favoriteTeams: team[];
    teams: team[];
    favoriteLeagues: league[];
    leagues: league[];
    favoritePlayers: player[];
    players: player[];
    setFavoriteTeams: React.Dispatch<React.SetStateAction<T[]>>;
    setTeams: React.Dispatch<React.SetStateAction<T[]>>;
    setFavoriteLeagues: React.Dispatch<React.SetStateAction<T[]>>;
    setLeagues: React.Dispatch<React.SetStateAction<T[]>>;
    setFavoritePlayers: React.Dispatch<React.SetStateAction<T[]>>;
    setPlayers: React.Dispatch<React.SetStateAction<T[]>>;
    getTeams: () => Promise<void>;
    getLeagues: () => Promise<void>;
    getPlayers: () => Promise<void>;
    loading: boolean;
}

// Criação do contexto
export const ItemsContext = createContext<ItemsContextType<any> | undefined>(undefined);

// Provider props
interface ItemsProviderProps {
    children: ReactNode;
}

// Provider
export const ItemsProvider: React.FC<ItemsProviderProps> = ({ children }) => {
    const [favoriteTeams, setFavoriteTeams] = useState<team[]>([]);
    const [favoriteLeagues, setFavoriteLeagues] = useState<league[]>([]);
    const [favoritePlayers, setFavoritePlayers] = useState<player[]>([]);
    const [teams, setTeams] = useState<team[]>([]);
    const [leagues, setLeagues] = useState<league[]>([]);
    const [players, setPlayers] = useState<player[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    const { user, logged } = useUserContext();

    useEffect(() => {
        if(logged !== null) LoadData();
    }, [logged]);

    async function getTeams() {
        await api.get('teams', {
            params: {
                user_id: user?.id
            }}
        ).then((response: any) => {
            const mainTeams : team[] = response.data.all_teams;
            const favoriteTeams : team[] = response.data.favorite_team ? response.data.favorite_team : [];
            setFavoriteTeams(favoriteTeams.map(team => ({
                ...team,
                show: true
            })));
            setTeams(mainTeams.map(team => ({
                ...team,
                show: true
            })));
        }).catch((e: any) => {
            if(e.response.data.detail) {
                Toast.show({
                    props: {
                        type: "error",
                        text: e.response.data.detail
                    }
                });
            }
            else {
                Toast.show({
                    props: {
                        type: "error",
                        text: "Erro ao buscar times"
                    }
                });
            }
        })
    }

    async function getLeagues() {
        await api.get('leagues', {
            params: {
                user_id: user?.id
            }}
        ).then((response: any) => {
            const mainLeagues : league[] = response.data.all_leagues;
            const favoriteLeagues : league[] = response.data.favorite_leagues ? response.data.favorite_leagues : [];
            setFavoriteLeagues(favoriteLeagues.map(league => ({
                ...league,
                show: true
            })));
            setLeagues(mainLeagues.map(league => ({
                ...league,
                show: true
            })));
        }).catch((e: any) => {
            if(e.response.data.detail) {
                Toast.show({
                    props: {
                        type: "error",
                        text: e.response.data.detail
                    }
                });
            }
            else {
                Toast.show({
                    props: {
                        type: "error",
                        text: "Erro ao buscar ligas"
                    }
                });
            }
        })
    }

    async function getPlayers() {
        await api.get('players', {
            params: {
                user_id: user?.id
            }}
        ).then((response: any) => {
            const mainPlayers : player[] = response.data.all_players;
            const favoritePlayers : player[] = response.data.favorite_players ? response.data.favorite_players : [];
            setFavoritePlayers(favoritePlayers.map(player => ({
                ...player,
                show: true
            })));
            setPlayers(mainPlayers.map(player => ({
                ...player,
                show: true
            })));
        }).catch((e: any) => {
            if(e.response.data.detail) {
                Toast.show({
                    props: {
                        type: "error",
                        text: e.response.data.detail
                    }
                });
            }
            else {
                Toast.show({
                    props: {
                        type: "error",
                        text: "Erro ao buscar jogadores"
                    }
                });
            }
        })
    }

    const LoadData = async () => {
        setLoading(true);

        await api.get("/items", {
            params: {
                user_id: user?.id
            }
        }).then((response) => {
            const mainTeams : team[] = response.data.all_teams;
            const favoriteTeams : team[] = response.data.favorite_team ? response.data.favorite_team : [];
            const mainLeagues : league[] = response.data.all_leagues;
            const favoriteLeagues : league[] = response.data.favorite_leagues ? response.data.favorite_leagues : [];
            const mainPlayers : player[] = response.data.all_players;
            const favoritePlayers : player[] = response.data.favorite_players ? response.data.favorite_players : [];
            setFavoriteTeams(favoriteTeams.map(team => ({
                ...team,
                show: true
            })));
            setTeams(mainTeams.map(team => ({
                ...team,
                show: true
            })));
            setFavoriteLeagues(favoriteLeagues.map(league => ({
                ...league,
                show: true
            })));
            setLeagues(mainLeagues.map(league => ({
                ...league,
                show: true
            })));
            setFavoritePlayers(favoritePlayers.map(player => ({
                ...player,
                show: true
            })));
            setPlayers(mainPlayers.map(player => ({
                ...player,
                show: true
            })));
        }).catch((error) => {
            console.error('Erro ao carregar dados:', error.response.data.detail);
            Toast.show({
                props: {
                    type: "error",
                    text: "Erro ao carregar dados"
                }
            });
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <ItemsContext.Provider value={{
            favoriteTeams: favoriteTeams,
            teams: teams,
            favoriteLeagues: favoriteLeagues,
            leagues: leagues,
            favoritePlayers: favoritePlayers,
            players: players,
            setFavoriteTeams: setFavoriteTeams,
            setTeams: setTeams,
            setFavoriteLeagues: setFavoriteLeagues,
            setLeagues: setLeagues,
            setFavoritePlayers: setFavoritePlayers,
            setPlayers: setPlayers,
            loading: loading,
            getTeams: getTeams,
            getLeagues: getLeagues,
            getPlayers: getPlayers,
        }}>
            {children}
        </ItemsContext.Provider>
    );
};

// Hook personalizado para acessar o contexto
export const useItemsContext = (): ItemsContextType<any> => {
    const context = useContext(ItemsContext);

    if (!context) {
        throw new Error('useItemsContext deve ser usado dentro de um ItemsProvider');
    }
    
    return context;
};

const favoritePlayersMock : player[] = [
    // {
    //     id: '276',
    //     name: 'Neymar',
    //     is_favorite: true,
    //     photo: 'https://media.api-sports.io/football/players/276.png',
    //     show: true,
    // },
    // {
    //     id: '629',
    //     name: 'K. De Bruyne',
    //     is_favorite: true,
    //     photo: 'https://media.api-sports.io/football/players/629.png',
    //     show: true,
    // },
    // {
    //     id: '874',
    //     name: 'Cristiano Ronaldo',
    //     is_favorite: true,
    //     photo: 'https://media.api-sports.io/football/players/874.png',
    //     show: true,
    // },
]

const playersMock : player[] = [
    {
        id: '276',
        name: 'Neymar',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
        show: true,
    },
    {
        id: '629',
        name: 'K. De Bruyne',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
        show: true,
    },
    {
        id: '874',
        name: 'Cristiano Ronaldo',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
        show: true,
    },
    {
        id: '2761',
        name: 'Neymar',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
        show: true,
    },
    {
        id: '6291',
        name: 'K. De Bruyne',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
        show: true,
    },
    {
        id: '8741',
        name: 'Cristiano Ronaldo',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
        show: true,
    },
    {
        id: '2762',
        name: 'Neymar',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/276.png',
        show: true,
    },
    {
        id: '6292',
        name: 'K. De Bruyne',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/629.png',
        show: true,
    },
    {
        id: '8742',
        name: 'Cristiano Ronaldo',
        is_favorite: false,
        photo: 'https://media.api-sports.io/football/players/874.png',
        show: true,
    },
]