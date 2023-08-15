import { Box,Stack,IconButton,Typography } from "@mui/material"
import Sidebar from "./SideBar"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useUserContext } from "../components/ContextApi/userContext";
export default function Dashboard(){
const [draweOpen,setDrawer]=useState(false)

const {LogOut,email}=useUserContext()

const ToggleDrawer = ()=>{
setDrawer(!draweOpen)
}
    return <>
<Box>

   <Stack direction={'row'}>

    <Sidebar DrawerOpen={draweOpen} DrawerClose={ToggleDrawer}/>
        {/* content box */}
      <Box sx={{width:"100%"}}>
           {/* top header */}

          <Box sx={{bgcolor:"primary.main",color:"white",display:"flex",justifyContent:
          {
             xs:"space-between",
             md:"end"
           }
           }
} p={2}>
    
<IconButton sx={{p:0,display:{
    xs:"block",
    md:"none"
}}} onClick={()=>ToggleDrawer()}>
    <MenuIcon sx={{color:"white"}}/>
</IconButton>

<Typography > <AccountCircleIcon sx={{marginTop:"1px",}}/> User : {email}</Typography>
<IconButton sx={{p:0,marginLeft:2}} onClick={LogOut}>
    <LogoutIcon sx={{color:"primary.dark"}}/>
</IconButton>
</Box >

{/* top header end */}

{/* content pages */}
{/* <Clients/> */}
<Outlet/>
{/* end content */}


 
</Box>
</Stack>
      </Box>

    </>
}