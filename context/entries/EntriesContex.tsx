import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
    entries: Entry[];
    // metods
    addNewEntry: (description: string) => void
}

export const EntriesContex = createContext({} as ContextProps)