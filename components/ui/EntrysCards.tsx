import { FC, DragEvent, useContext } from 'react'
import { Entry } from '../../interfaces'
import { UIContex } from '../../context/ui';

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry;
}

export const EntrysCards: FC<Props> = ({ entry }) => {


    const router = useRouter()

    const { endDragging, startDragging } = useContext(UIContex)

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('idEntry', entry._id)
        startDragging()
    }
    const onDragEnd = () => {
        endDragging()
    }


    const onclickRedirect = () => {
        router.push(`/entries/${entry._id}`)
    }
    return (
        <Card
            onClick={onclickRedirect}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            sx={{ marginBottom: 1 }}>
            <CardActionArea>

                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{dateFunctions.getFormatDistance(entry.createdAt)}</Typography>
                </CardActions>

            </CardActionArea>

        </Card>
    )
}
