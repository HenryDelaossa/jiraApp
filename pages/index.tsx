import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/Layouts';
import { EntrysList, NewEntry } from '../components/ui';

const Home: NextPage = () => {




  return (
    <Layout title='Home-Jira'>
      <Grid container spacing={2} padding={[1, 1, 1, 1]}>

        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="pendientes" />

            {/* agregar nueva entrada */}
            <NewEntry/>
            {/* listado de entradas */}
            <EntrysList status='pending'/>
          </Card>
        </Grid>


        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="en progreso" />
            <EntrysList status='on progress' />
          </Card>
        </Grid>
 

        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="terminadas" />
            <EntrysList status='finished'/>
          </Card>
        </Grid>

      </Grid>
    </Layout>

  )
}

export default Home
