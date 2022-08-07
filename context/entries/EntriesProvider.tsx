import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContex, entriesReducer } from './';
import { useSnackbar } from "notistack"

import { entriesApi } from '../../apis';


export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider: FC<PropsWithChildren<EntriesState>> = ({ children }) => {

    const { enqueueSnackbar } = useSnackbar()
    /**
     * AddNewEntry is a function that takes a string as an argument and returns an object with a unique
     * id, the string, the current date, and a status of pending.
     * @param {string} description - string - this is the description of the entry
     */
    const addNewEntry = async (description: string) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description })
        dispatch({ type: '[Entry] - Add-Entry', payload: data })

    }




    /**
     * The function takes an object with the properties _id, description, and status, and then it
     * updates the entry with the given _id with the given description and status.
     * @param {Entry}  - Entry - is the type of the object that is being passed in.
     */
    const updateEntry = async ({ _id, description, status }: Entry, showSnackBar = false) => {

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
            dispatch({ type: '[Entry] - Updated-Entry', payload: data });
            if (showSnackBar) {
                enqueueSnackbar('Tarea actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }

        } catch (error) {
            console.log(error)
        }

    }


    const deleteEntry = async (entry: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${entry._id}`)

            dispatch({
                type: '[Entry] - Delete-Entry',
                payload: data
            })

            if (showSnackbar) {
                enqueueSnackbar('Entrada borrada correctamente', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                })
            }

        } catch (error) {
            console.log({ error });
        }
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
            updateEntry,
            deleteEntry
        }}>
            {children}
        </EntriesContex.Provider>
    )
}