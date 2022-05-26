
import { UIState } from './';

type UIActionType =
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - Set IsAddEntry', payload: boolean }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideBarMenuOpen: true
            }
        case 'UI - Close Sidebar':
            return {
                ...state,
                sideBarMenuOpen: false
            }
        case 'UI - Set IsAddEntry':
            return {
                ...state,
                isAddingEntry: action.payload
            }

        default:
            return state;
    }
}