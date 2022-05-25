import { createContext } from 'react';

interface ContextProps {
    sideBarMenuOpen: boolean;
    // metodo
    openSideBarMenu: () => void;
    closeSideBarMenu: () => void
}

export const UIContex = createContext({} as ContextProps)