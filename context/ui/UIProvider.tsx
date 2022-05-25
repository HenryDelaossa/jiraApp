import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContex, uiReducer } from './';


export interface UIState {
    sideBarMenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
    sideBarMenuOpen: false
}

export const UIProvider: FC<PropsWithChildren<UIState>> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideBarMenu = () => {
        dispatch({type:"UI - Open Sidebar"})
    }

    const closeSideBarMenu = () => {
        dispatch({type:"UI - Close Sidebar"})
    }

    return (
        <UIContex.Provider value={{
            ...state,
            // metodo
            openSideBarMenu,
            closeSideBarMenu
        }}>
            {children}
        </UIContex.Provider>
    )
}
