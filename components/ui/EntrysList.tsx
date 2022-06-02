import { DragEvent, FC, useContext, useMemo } from 'react';
import { EntryStatus } from '../../interfaces/entries';
import { EntriesContex } from '../../context/entries/EntriesContex';
import styles from './EntryList.module.css'

import { List, Paper } from "@mui/material"
import { EntrysCards } from './';
import { UIContex } from '../../context/ui';

interface Props {
    status: EntryStatus;
}


export const EntrysList: FC<Props> = ({ status }) => {

    const { entries, updateEntry} = useContext(EntriesContex)
    const {isDragging, endDragging} = useContext(UIContex)


    const entrysbyStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

    const onDropEntry = (event:DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('idEntry');
        const entri = entries.find((entr) => entr._id === id)!;
        entri.status = status
        updateEntry(entri)
        endDragging()
    }

    const allowDrop = (event:DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }



    return (
        // to do: el drop
        <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: "scroll", backgroundColor: 'transparent', padding: '1px 5px','&::-webkit-scrollbar': { display: 'none' } }}>
                {/* cambia si se hace drop o no */}
                <List sx={{ opacity: isDragging ? 0.4 : 1, transition: '.2s all' }}>
                    {
                        entrysbyStatus.map(entry => (
                            <EntrysCards  key={entry._id} entry={entry}/>                            
                        ))
                    }
                </List>

            </Paper>
        </div>
    )
}
