import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContex } from "../../context/ui";


export const NavBar = () => {

  const { openSideBarMenu } = useContext(UIContex)

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          onClick={openSideBarMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h5">
          JIRA
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
