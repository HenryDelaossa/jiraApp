import { useContext } from 'react';
import { UIContex } from "../../context/ui";

import { AppBar, IconButton, Toolbar, Typography, Link } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NextLink from 'next/link';


export const NavBar = () => {

  const { openSideBarMenu } = useContext(UIContex);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          onClick={openSideBarMenu}>
          <MenuOutlinedIcon />
        </IconButton>

        <NextLink href={'/'} passHref>
          <Link underline='none' color={'white'}>
            <Typography variant="h5">
              JIRA
            </Typography>
          </Link>

        </NextLink>

      </Toolbar>
    </AppBar>
  )
}
