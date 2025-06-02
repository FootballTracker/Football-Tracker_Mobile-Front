type item = {
    id: string;
    is_favorite: boolean;
    show: boolean;
}

export function SwapFavorites<T extends item>(favorites : T[], normal: T[], item: T) {
    const index : number = normal.findIndex(t => t.id === item.id);

    if (item.is_favorite) {
        favorites = favorites.filter(t => t.id !== item.id);

        normal = [
            ...normal.slice(0, index),
            {...item, show: true, is_favorite: false},
            ...normal.slice(index)
        ]
    } else {
        favorites = [...favorites, { ...item, is_favorite: true }];

        normal = [
            ...normal.slice(0, index),
            {...item, show: false},
            ...normal.slice(index + 1)
        ]
    }

    // FAZER REQUISIÇÃO PRO BACK

    return {
        favorites: favorites,
        normal: normal,
    }
}