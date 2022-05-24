import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/Layouts';

const Home: NextPage = () => {
  return (
    <Layout title='Jira'>
      <Typography variant="h1" >
        hola Henry
      </Typography>
    </Layout>

  )
}

export default Home
