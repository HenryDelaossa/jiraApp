import { FC, PropsWithChildren, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContex, entriesReducer } from './';

import { v4 as uuidv4 } from 'uuid';


export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id:uuidv4(),
            description:"pendiente sdjsdfjhdfk DFhjgfhDFHL D dfkjGFHJsg fSFGJrghu rgrg ",
            status:'pending',
            createdAt:Date.now()
        },
        {
            _id:uuidv4(),
            description:"enprogreso sdjsdfjhdfk DFhjgfhDFHL D dfkjGFHJsg fSFGJrghu rgrg ",
            status:'on progress',
            createdAt:Date.now()
        },
        {
            _id:uuidv4(),
            description:"terminadas sdjsdfjhdfk DFhjgfhDFHL D dfkjGFHJsg fSFGJrghu rgrg ",
            status:'finished',
            createdAt:Date.now()
        }
    ]
}

export const EntriesProvider: FC<PropsWithChildren<EntriesState>> = ({ children }) => {


    const addNewEntry = (description:string) => {
        const newEntry:Entry = {
            _id: uuidv4(),
            description,
            createdAt:Date.now(),
            status:'pending'
        }
        dispatch({type:'[Entry] - Add-Entry', payload: newEntry})
    }

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    return (
        <EntriesContex.Provider value={{
            ...state,
            // metodo
            addNewEntry
         }}>
         {children}
        </EntriesContex.Provider>
     )
}