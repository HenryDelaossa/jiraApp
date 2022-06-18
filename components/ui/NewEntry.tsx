import { ChangeEvent, useState, useContext } from 'react'
import { UIContex } from '../../context/ui';
import { EntriesContex } from '../../context/entries';

import { Button, TextField, Box } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContex)

    const { isAddingEntry, setIsAddingEntry } = useContext(UIContex)


    const [inputValue, setInputValue] = useState('')
    const [touch, setTouch] = useState(false)

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }
    const onSave = () => {
        if (inputValue.length <= 0) return;

        addNewEntry(inputValue)

        setIsAddingEntry(false)
        setTouch(false)
        setInputValue('')

    }


    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>

            {
                isAddingEntry ?
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1, transition: ".3s all" }}
                            placeholder='insertar entrada'
                            autoFocus
                            multiline
                            minRows={12}
                            maxRows={200}
                            label='nueva entrada'
                            helperText={inputValue.length <= 0 && touch && 'inngresa un valor'}
                            error={inputValue.length <= 0 && touch}
                            value={inputValue}
                            onInput={onTextFieldChange}
                            onBlur={() => setTouch(true)}
                        />

                        <Box display='flex' justifyContent='space-between'>

                            <Button
                                variant='outlined'
                                onClick={() => setIsAddingEntry(false)}
                            >
                                cancelar
                            </Button>

                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveOutlinedIcon />}
                                onClick={onSave}>
                                Guardar
                            </Button>

                        </Box>

                    </>
                    : (

                        <Button
                            startIcon={<AddOutlinedIcon />}
                            fullWidth
                            variant='outlined'
                            onClick={() => setIsAddingEntry(true)}>
                            Agregar tarea
                        </Button>
                    )

            }




        </Box>
    )
}
