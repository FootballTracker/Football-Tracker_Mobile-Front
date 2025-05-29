//Default Imports
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'expo-router';

type UserPages = {
    Profile: string;
    Configurations: string;
    DeleteUser: string;
    UserConfigs: string;
    UpdateUsername: string;
    UpdateEmail: string;
    UpdatePassword: string;
}

type Pages = {
    league: string;
    team: string;
    player: string;
    match: string;
}

type pageContextProps = {
    page: string,
    userPages: UserPages | null,
    setPage: (page: string) => void,
    rootPage: string,
    setRootPage: (page: string) => void,
    isOnUserPages: boolean,
}

const PageContext = createContext<pageContextProps>({
    page: 'Ligas',
    userPages: null,
    setPage: (page: string) => {},
    rootPage: 'Ligas',
    setRootPage: (page: string) => {},
    isOnUserPages: false,
});

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
    const [page, setPage] = useState('Ligas');
    const [rootPage, setRootPage] = useState('Ligas');
    const [isOnUserPages, setIsOnUserPages] = useState(false);
    const pathname = usePathname();

    const userPages : UserPages = {
        Profile: 'Perfil',
        Configurations: 'Configurações',
        DeleteUser: 'Excluir Conta',
        UserConfigs: 'Meus Dados',
        UpdateUsername: 'Nome de Usuário',
        UpdateEmail: 'Email',
        UpdatePassword: 'Senha',
    }

    const pages : Pages = {
        league: 'Ligas',
        team: 'Times',
        player: 'Jogadores',
        match: 'Partida',
    }

    useEffect(() => {
        const currentPage : string[] = pathname.split('/'); //Gets the last part of the pathname (the current page name)
        const length = currentPage.length;

        if(currentPage[length-1] in userPages) {
            setPage(userPages[currentPage[length-1] as keyof typeof userPages]);
            setIsOnUserPages(true);
            return
        }

        setIsOnUserPages(false);

        if(pathname === '/') setPage(rootPage);
        else setPage(pages[currentPage[length-2] as keyof typeof pages]);

    }, [pathname])

    return (
        <PageContext.Provider value={{ page, userPages, setPage, rootPage, setRootPage, isOnUserPages }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePage = () => useContext(PageContext);
