import { createContext, useContext, useState } from 'react';

const PageContext = createContext({
  page: 'Ligas',
  setPage: (page: string) => {}
});

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState('Ligas');
  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);
