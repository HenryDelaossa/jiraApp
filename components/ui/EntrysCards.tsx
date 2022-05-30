import { FC, DragEvent, useContext } from 'react'
import { Entry } from '../../interfaces'

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { UIContex } from '../../context/ui';

interface Props {
    entry: Entry;
}

export const EntrysCards: FC<Props> = ({ entry }) => {

    const {endDragging, startDragging} = useContext(UIContex)

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('idEntry', entry._id)
        startDragging()
    }
    const onDragEnd = () => {
        endDragging()
    }

    return (
        <Card
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            sx={{ marginBottom: 1 }}>
            <CardActionArea>

                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>hace 20 minutos</Typography>
                </CardActions>

            </CardActionArea>

        </Card>
    )
}
