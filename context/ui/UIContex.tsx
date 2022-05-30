import { createContext } from 'react';

interface ContextProps {
    sideBarMenuOpen: boolean;
    isAddingEntry: boolean
    isDragging:boolean
    // metodo
    openSideBarMenu: () => void;
    closeSideBarMenu: () => void;
    setIsAddingEntry: (isAdding: boolean) => void
    // dragging
    startDragging: () => void
    endDragging: () => void
}

export const UIContex = createContext({} as ContextProps)