import Card from "@/components/Card";

export type item = {
    id: string;
    is_favorite: boolean;
    show: boolean;
}

export function SwapFavorites<T extends item>(setFavorites: React.Dispatch<React.SetStateAction<T[]>>, setNormal: React.Dispatch<React.SetStateAction<T[]>>, item: T) {
    const updatedItem = {
        ...item,
        is_favorite: !item.is_favorite,
    };

    if (item.is_favorite) {
        // Remover de favorites e adicionar em normal
        // setFavorites(prev => prev.filter(i => i.id !== item.id));
        setFavorites(prev =>
            prev.map(i => (i.id === item.id ? {...updatedItem, show: false} : i))
        );

        // Atualizar em normal: apenas ativar o item
        setNormal(prev =>
            prev.map(i => (i.id === item.id ? {...updatedItem, show: true} : i))
        );
    } else {
        // Remover de normal e adicionar em favorites
        setFavorites(prev => [...prev, {...updatedItem, show: true}]);
        
        // Atualizar em normal: ocultar o item
        setNormal(prev =>
            prev.map(i => (i.id === item.id ? {...updatedItem, show: false} : i))
        );
    }

    // // FAZER REQUISIÇÃO PRO BACK
}

// export function SwapFavorites<T extends item>(favorites : T[], normal: T[], setFavorites: React.Dispatch<React.SetStateAction<T[]>>, setNormal: React.Dispatch<React.SetStateAction<T[]>>, item: T) {
//     // Cria uma nova versão do item com a flag alterada
//     const updatedItem = {
//         ...item,
//         is_favorite: !item.is_favorite,
//         show: !item.show,
//     };

//     const index = normal.findIndex(i => i.id == item.id);

//     if (item.is_favorite) {
//     // Remover de favorites e adicionar em normal
//     setFavorites(prev => prev.filter(i => i.id !== item.id));
//     setNormal(prev => [...prev, updatedItem]);
//   } else {
//     // Remover de normal e adicionar em favorites
//     setNormal(prev => prev.filter(i => i.id !== item.id));
//     setFavorites(prev => [...prev, updatedItem]);
//   }

//     // // FAZER REQUISIÇÃO PRO BACK
// }