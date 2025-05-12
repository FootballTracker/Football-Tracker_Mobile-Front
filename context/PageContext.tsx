//Default Imports
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'expo-router';

type PageInfo = {
  elementName: string;
  pageName: string;
}

type Pages = {
  profile: PageInfo;
  configurations: PageInfo;
  deleteUser: PageInfo;
  userConfigs: PageInfo;
  updateUsername: PageInfo;
  updateEmail: PageInfo;
  updatePassword: PageInfo;
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
        profile: {
            elementName: 'Profile',
            pageName: 'Perfil'
        },
        configurations: {
            elementName: 'Configurations',
            pageName: 'Configurações'
        },
        deleteUser: {
            elementName: 'DeleteUser',
            pageName: 'Excluir Conta'
        },
        userConfigs: {
            elementName: 'UserConfigs',
            pageName: 'Meus Dados'
        },
        updateUsername: {
            elementName: 'UpdateUsername',
            pageName: 'Nome de Usuário'
        },
        updateEmail: {
            elementName: 'UpdateEmail',
            pageName: 'Email'
        },
        updatePassword: {
            elementName: 'UpdatePassword',
            pageName: 'Senha'
        },
    }

    useEffect(() => {
        const pageName = pathname.split('/').at(-1); //Gets the last part of the pathname (the current page name)
        switch(pageName) {
            case pages.profile.elementName: 
                setPage(pages.profile.pageName);
                break;
            case pages.configurations.elementName: 
                setPage(pages.configurations.pageName);
                break;
            case pages.deleteUser.elementName: 
                setPage(pages.deleteUser.pageName);
                break;
            case pages.userConfigs.elementName: 
                setPage(pages.userConfigs.pageName);
                break;
            case pages.updateUsername.elementName: 
                setPage(pages.updateUsername.pageName);
                break;
            case pages.updateEmail.elementName: 
                setPage(pages.updateEmail.pageName);
                break;
            case pages.updatePassword.elementName: 
                setPage(pages.updatePassword.pageName);
                break;
        }
    }, [pathname])

    return (
        <PageContext.Provider value={{ page, pages, setPage, previousPage, setPreviousPage }}>
        {children}
        </PageContext.Provider>
    );
};

export const usePage = () => useContext(PageContext);
