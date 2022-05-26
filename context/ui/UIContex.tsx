import { createContext } from 'react';

interface ContextProps {
    sideBarMenuOpen: boolean;
    isAddingEntry: boolean
    // metodo
    openSideBarMenu: () => void;
    closeSideBarMenu: () => void;
    setIsAddingEntry: (isAdding: boolean) => void
}

export const UIContex = createContext({} as ContextProps)