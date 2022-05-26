import { DragEvent, FC, useContext, useMemo } from 'react';
import { EntryStatus } from '../../interfaces/entries';
import { EntriesContex } from '../../context/entries/EntriesContex';

import { List, Paper } from "@mui/material"
import { EntrysCards } from './';

interface Props {
    status: EntryStatus;
}


export const EntrysList: FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContex)

    const entrysbyStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

    const onDropEntry = (event:DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('idEntry')
    }

    const allowDrop = (event:DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }



    return (
        // to do: el drop
        <div onDrop={onDropEntry} onDragOver={allowDrop}>
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: "scroll", backgroundColor: 'transparent', padding: '1px 5px' }}>
                {/* to do: cambia si se hace drop o no */}
                <List sx={{ opacity: 1, transition: 300 }}>
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
