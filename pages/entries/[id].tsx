import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'

import { Layout } from "../../components/Layouts"
import { Entry, EntryStatus } from '../../interfaces';

import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, capitalize, IconButton } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { dbEntries } from '../../database';
import { EntriesContex } from '../../context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';


interface Props {
    entry: Entry
}

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"]

export const EntryPage: FC<Props> = ({ entry }) => {

    const router = useRouter()
    const { updateEntry, deleteEntry } = useContext(EntriesContex);



    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touchForm, setTouchForm] = useState(false);

    const onTextFieldInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setInputValue(target.value)
    }

    const onStatusChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setStatus(target.value as EntryStatus);
    }

    const onClickSave = () => {
        if (inputValue.length === 0) return;

        const upEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        updateEntry(upEntry, true);
    }



    const onClickDelete = () => {
        deleteEntry(entry, true);
        router.push('/')

    }
    const isNotInputValid = useMemo(() => inputValue.length <= 0 && touchForm, [inputValue, touchForm])



    return (
        <Layout title={inputValue.substring(0, 10) + '...'}>
            <Grid
                container
                justifyContent="center"
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada: ${inputValue.substring(0, 20)}`}
                            subheader={dateFunctions.getFormatDistance(entry.createdAt)} />

                        <CardContent>

                            <TextField
                                sx={{ marginBottom: 1, marginTop: 2 }}
                                fullWidth
                                placeholder="Nueva entrada"
                                autoFocus
                                multiline
                                label="Nueva Entrada"
                                value={inputValue}
                                onChange={onTextFieldInputChange}
                                onBlur={() => setTouchForm(true)}
                                helperText={isNotInputValid && 'ingresar caracteres'}
                                error={isNotInputValid}
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChange}
                                >
                                    {
                                        validStatus.map(opt => (
                                            <FormControlLabel
                                                key={opt}
                                                value={opt}
                                                control={<Radio />}
                                                label={capitalize(opt)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveIcon />}
                                variant="outlined"
                                fullWidth
                                disabled={inputValue.length <= 0}
                                onClick={onClickSave}
                            >
                                GUARDAR
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton sx={{ position: "fixed", bottom: 30, right: 30, backgroundColor: "white" }} onClick={onClickDelete} >
                <DeleteOutlineTwoToneIcon sx={{ color: "red" }} />
            </IconButton>
        </Layout>

    )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.params as { id: string };
    const entry = await dbEntries.getEntriById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage