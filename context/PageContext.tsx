import { createContext, useContext, useState } from 'react';

type pageContextProps = {
    page: string,
    setPage: (page: string) => void,
    previousPage: string | null,
    setPreviousPage: (page: string | null) => void
}

const PageContext = createContext<pageContextProps>({
    page: 'Ligas',
    setPage: (page: string) => {},
    previousPage: null,
    setPreviousPage: (page: string | null) => {}
});

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState('Ligas');
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  return (
    <PageContext.Provider value={{ page, setPage, previousPage, setPreviousPage }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);
