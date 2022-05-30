import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContex, uiReducer } from './';


export interface UIState {
    sideBarMenuOpen: boolean
    isAddingEntry: boolean
    isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
    sideBarMenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}

export const UIProvider: FC<PropsWithChildren<UIState>> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideBarMenu = () => {
        dispatch({ type: "UI - Open Sidebar" })
    }

    const closeSideBarMenu = () => {
        dispatch({ type: "UI - Close Sidebar" })
    }

    const setIsAddingEntry = (isAdding: boolean) => {
        dispatch({ type: 'UI - Set IsAddEntry', payload: isAdding })
    }

    const startDragging = () => {
        dispatch({type:'UI - Start Dragging'})
    }
    const endDragging = () => {
        dispatch({type:'UI - End Dragging'})
    }

    return (
        <UIContex.Provider value={{
            ...state,
            // metodos
            // abrir y cerrar sidebarmenu
            openSideBarMenu,
            closeSideBarMenu,
            // set agregar entrada tareas
            setIsAddingEntry,
            // dragging
            startDragging,
            endDragging
        }}>
            {children}
        </UIContex.Provider>
    )
}
