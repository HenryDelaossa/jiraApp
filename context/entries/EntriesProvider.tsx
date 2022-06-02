import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContex, entriesReducer } from './';

import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';


export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider: FC<PropsWithChildren<EntriesState>> = ({ children }) => {


    /**
     * AddNewEntry is a function that takes a string as an argument and returns an object with a unique
     * id, the string, the current date, and a status of pending.
     * @param {string} description - string - this is the description of the entry
     */
    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }
        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })
    }



    /**
     * The function updateEntry takes an argument of type Entry and returns a function that takes an
     * argument of type Dispatch and returns void.
     * @param {Entry} entry - Entry - This is the entry that we want to update.
     */
    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] - Updated-Entry', payload: entry })
    }



    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    /**
     * I'm going to call the entriesApi.get function, and when it returns, I'm going to dispatch an
     * action with the data that it returns.
     */
    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        console.log(data)
        dispatch({ type: '[Entry] - Refresh-Data', payload: data })
    }

    useEffect(() => {
        refreshEntries()
    }, [])

    return (
        <EntriesContex.Provider value={{
            ...state,
            // metodo
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContex.Provider>
    )
}