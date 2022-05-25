import { useContext } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from "@mui/material"
import { Box } from "@mui/system"
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContex } from '../../context/ui';

const sideBaritems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"]


export const SideBar = () => {


    const {sideBarMenuOpen, closeSideBarMenu} = useContext(UIContex)


    return (
        <Drawer
            anchor="left"
            open={sideBarMenuOpen}
            onClose={closeSideBarMenu}
        >

            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: "5px 10px" }} >
                    <Typography variant="h4">menu</Typography>
                </Box>

                <List>
                    {sideBaritems.map((text, index) => <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 ? <ArchiveOutlinedIcon /> : <EmailOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />

                    </ListItem>)}
                </List>
                <Divider />
                <List>
                    {sideBaritems.map((text, index) => <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 ? <ArchiveOutlinedIcon /> : <EmailOutlinedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />

                    </ListItem>)}
                </List>

            </Box>

        </Drawer>
    )
}
