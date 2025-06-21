//Default Imports
import { useUserContext } from "@/context/UserContext";
import { useItemsContext } from "@/context/ItemsContext";
import { item, SwapFavorites } from "@/constants/Favorites";
import { router } from "expo-router";

//Components
import Card from "./Card";
import InfoMessage from "./InfoMessage";

//Functions
const accessPage = (page: string, id: string) => {
    router.push(`/(pages)/${page}/${id}` as any);;
}

const changeFavorite = <T extends item>(setFavorite: React.Dispatch<React.SetStateAction<T[]>>, setMain: React.Dispatch<React.SetStateAction<T[]>>, item: T, type: string, userId: string | undefined) => {
    SwapFavorites(setFavorite, setMain, item, type, userId);
}



export function FavoriteTeams() {
    const { favoriteTeams, setFavoriteTeams, setTeams } = useItemsContext();
    const { user } = useUserContext();

    return (
        <>
            {favoriteTeams && favoriteTeams.length && favoriteTeams.filter(l => l.show).length ? (
                favoriteTeams.map((team, index) => (
                    <Card
                        favorite={team.is_favorite}
                        handleOpen={() => {accessPage('team', team.id)}}
                        handleFavorite={() => {changeFavorite(setFavoriteTeams, setTeams, team, "team", user?.id)}}
                        info={team.name}
                        image={team.logo}
                        show={team.show}
                        key={index}
                    />
                ))
            ) : (
                <InfoMessage text='Nenhum time favoritado.'/>
            )}
        </>
    )
}

export function MainTeams() {
    const { teams, setFavoriteTeams, setTeams } = useItemsContext();
    const { user } = useUserContext();

    return (
        <>
            {teams && teams.length ? (
                teams.filter(l => l.show).length ? 
                teams.map((team, index) => (
                    <Card
                        favorite={team.is_favorite}
                        handleOpen={() => {accessPage('team', team.id)}}
                        handleFavorite={() => {changeFavorite(setFavoriteTeams, setTeams, team, "team", user?.id)}}
                        info={team.name}
                        image={team.logo}
                        show={team.show}
                        key={index}
                    />
                )) : <InfoMessage text='Todos os times foram favoritados.'/>
            ) : (
                <InfoMessage text='Nenhum time encontrado.'/>
            )}
        </>
    )
}

export function FavoriteLeagues() {
    const { favoriteLeagues, setFavoriteLeagues, setLeagues } = useItemsContext();
    const { user } = useUserContext();

    return (
        <>
            {favoriteLeagues && favoriteLeagues.length && favoriteLeagues.filter(l => l.show).length ? (
                favoriteLeagues.map((league, index) => (
                    <Card
                        favorite={league.is_favorite}
                        handleOpen={() => {accessPage('league', league.id)}}
                        handleFavorite={() => {changeFavorite(setFavoriteLeagues, setLeagues, league, "league", user?.id);}}
                        info={league.name}
                        image={league.logo_url}
                        show={league.show}
                        key={index}
                    />
                ))
            ) : (
                <InfoMessage text='Nenhuma liga favoritada.'/>
            )}
        </>
    )
}

export function MainLeagues() {
    const { leagues, setFavoriteLeagues, setLeagues } = useItemsContext();
    const { user } = useUserContext();

    return (
        <>
            {leagues && leagues.length ? (
                leagues.filter(l => l.show).length ? 
                leagues.map((league, index) => (
                    <Card
                        favorite={league.is_favorite}
                        handleOpen={() => {accessPage('league', league.id)}}
                        handleFavorite={() => {changeFavorite(setFavoriteLeagues, setLeagues, league, "league", user?.id);}}
                        info={league.name}
                        image={league.logo_url}
                        show={league.show}
                        key={index}
                    />
                )) : <InfoMessage text='Todas as ligas foram favoritadas.'/>
            ) : (
                <InfoMessage text='Nenhuma liga encontrada.'/>
            )}
        </>
    )
}

export function FavoritePlayers() {
    const { favoritePlayers, setFavoritePlayers, setPlayers } = useItemsContext();
    const { user } = useUserContext();

    return (
        <>
            {favoritePlayers && favoritePlayers.length && favoritePlayers.filter(l => l.show).length ? (
                favoritePlayers.map((player, index) => (
                    <Card
                        favorite={player.is_favorite}
                        handleOpen={() => {accessPage('player', player.id)}}
                        handleFavorite={() => {changeFavorite(setFavoritePlayers, setPlayers, player, "player", user?.id)}}
                        info={player.name}
                        image={player.photo}
                        show={player.show}
                        key={index}
                    />
                ))
            ) : (
                <InfoMessage text='Nenhum jogador favoritado.'/>
            )}
        </>
    )
}

export function MainPlayers() {
    const { players, setFavoritePlayers, setPlayers } = useItemsContext();
    const { user } = useUserContext();

    return (
        <>
            {players && players.length ? (
                players.filter(l => l.show).length ? 
                players.map((player, index) => (
                    <Card
                        favorite={player.is_favorite}
                        handleOpen={() => {accessPage('player', player.id)}}
                        handleFavorite={() => {changeFavorite(setFavoritePlayers, setPlayers, player, "player", user?.id)}}
                        info={player.name}
                        image={player.photo}
                        show={player.show}
                        key={index}
                    />
                )) : <InfoMessage text='Todos os jogadores foram favoritados.'/>
            ) : (
                <InfoMessage text='Nenhum jogador encontrado.'/>
            )}
        </>
    )
}