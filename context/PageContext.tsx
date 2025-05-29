//Default Imports
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'expo-router';

type Pages = {
    Profile: string;
    Configurations: string;
    DeleteUser: string;
    UserConfigs: string;
    UpdateUsername: string;
    UpdateEmail: string;
    UpdatePassword: string;
}

type pageContextProps = {
    page: string,
    pages: Pages | null,
    setPage: (page: string) => void,
    previousPage: string | null,
    setPreviousPage: (page: string | null) => void
}

const PageContext = createContext<pageContextProps>({
    page: 'Ligas',
    pages: null,
    setPage: (page: string) => {},
    previousPage: null,
    setPreviousPage: (page: string | null) => {}
});

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
    const [page, setPage] = useState('Ligas');
    const [previousPage, setPreviousPage] = useState<string | null>(null);
    const pathname = usePathname();

    const pages : Pages = {
        Profile: 'Perfil',
        Configurations: 'Configurações',
        DeleteUser: 'Excluir Conta',
        UserConfigs: 'Meus Dados',
        UpdateUsername: 'Nome de Usuário',
        UpdateEmail: 'Email',
        UpdatePassword: 'Senha',
    }

    useEffect(() => {
        const currentPage : string | undefined = pathname.split('/').at(-1); //Gets the last part of the pathname (the current page name)

        if(currentPage && currentPage in pages) {
            setPage(pages[currentPage as keyof typeof pages]);
            return;
        }

        if(previousPage) {
            setPage(previousPage);
            setPreviousPage(null);
        }
    }, [pathname])

    return (
        <PageContext.Provider value={{ page, pages, setPage, previousPage, setPreviousPage }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePage = () => useContext(PageContext);
