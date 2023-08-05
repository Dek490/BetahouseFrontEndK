import { Box, Stack, Typography, Drawer } from "@mui/material"
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import CollectionsIcon from '@mui/icons-material/Collections';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
// import BusinessIcon from '@mui/icons-material/Business';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import StarBorder from '@mui/icons-material/StarBorder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState } from "react";
import { Link } from "react-router-dom";
// import StarBorder from '@mui/icons-material/StarBorder';



export default function Sidebar({ DrawerOpen, DrawerClose }) {
  const [selectedMenu,setMenu]=useState('')

  return <>

    <Drawer
      open={DrawerOpen}
      onClose={DrawerClose}
    >
      <Box sx={{ width: "300px", bgcolor:"primary.main" }}>


        <Box sx={{ p: 4, borderBottom: 2, borderColor: "#eee" }}>

          <Stack direction={'row'} spacing={1}>
            <Box>
              <AddHomeWorkIcon sx={{ color: "primary.dark", height: 30, fontSize: 50 }} />

            </Box>

            <Box><Typography variant="h6" sx={{ color: "primary.dark"}} > BetaHouse</Typography></Box>
          </Stack>
        </Box>




        {/* Menu list */}


        <Box>
        <List sx={{ width: '100%', maxWidth: 360}}
          component="nav"

        >
          <ListItemButton>
            <ListItemIcon sx={{ color: "primary.dark"}}>
              <DashboardIcon sx={{ color: "primary.dark"}}/>
            </ListItemIcon >
            <ListItemText primary="Dashboard" sx={{ color: "primary.dark"}}/>
          </ListItemButton>
   <Link to={'home'} style={{textDecoration:"none"}}>

<ListItemButton
      sx={[selectedMenu ==='Home' && {bgcolor:"primary.dark",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('Home')
        console.log('Home clicked')
      }}>
  <ListItemIcon sx={{ color: "primary.dark"}}>
    <AssignmentIcon sx={[selectedMenu!='Home' && {color:'primary.dark'},selectedMenu==='Home'&& {color:'white'}]}/>
  </ListItemIcon>
  <ListItemText primary="Home"sx={[selectedMenu!='Home' && {color:'primary.dark'}]}/>
</ListItemButton>
</Link>

<Link to={'client'} style={{textDecoration:"none"}}>

<ListItemButton
      sx={[selectedMenu ==='Client' && {bgcolor:"primary.dark",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('Client')
        // DrawerClose()
        console.log('Client clicked')
      }}>
  <ListItemIcon sx={{ color: "primary.dark"}}>
    <AssignmentIcon sx={[selectedMenu!='Client' && {color:'primary.dark'},selectedMenu==='Client'&& {color:'white'}]}/>
  </ListItemIcon >
  <ListItemText primary="Client" sx={[selectedMenu!='Client' && {color:'primary.dark'}]}/>
</ListItemButton>
</Link>

<Link to={'houses'} style={{textDecoration:"none"}}>

<ListItemButton  sx={[selectedMenu ==='Houses' && {bgcolor:"primary.dark",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('Houses')
        // DrawerClose()
        console.log('Houses clicked')
      }}>
  <ListItemIcon >
    <InboxIcon sx={[selectedMenu!='Houses' && {color:'primary.dark'},selectedMenu==='Houses'&& {color:'white'}]}/>
  </ListItemIcon>
  <ListItemText primary="Houses" sx={[selectedMenu!='Houses' && {color:'primary.dark'}]}/>

</ListItemButton>
</Link>
<Link to={'services'} style={{textDecoration:"none"}}>
  <ListItemButton 
 sx={[selectedMenu ==='Services' && {bgcolor:"primary.main",color:"white",":hover":{
  bgcolor:"primary.dark"
   }}]}
  onClick={()=>{
  setMenu('Services')


}}>
  <ListItemIcon>
  <MiscellaneousServicesIcon sx={[selectedMenu!='Services' && {color:'primary.dark'},selectedMenu==='Services'&& {color:'white'}]}/>
  </ListItemIcon>
  <ListItemText primary="Services"sx={[selectedMenu!='Services' && {color:'primary.dark'}]}/>

</ListItemButton>
</Link>

<Link to={'about'} style={{textDecoration:"none"}}>
<ListItemButton  sx={[selectedMenu ==='About' && {bgcolor:"primary.main",color:"white",":hover":{
  bgcolor:"primary.dark"
   }}]}
  onClick={()=>{
  setMenu('About')


}}>
  <ListItemIcon>
    <InfoIcon sx={[selectedMenu!='About' && {color:'primary.dark'},selectedMenu==='About'&& {color:'white'}]}/>
  </ListItemIcon>
  <ListItemText primary="About" sx={[selectedMenu!='About' && {color:'primary.dark'}]}/>

</ListItemButton>
</Link>


<ListItemButton >
  <ListItemIcon>
    <ContactsIcon sx={{ color: "primary.dark"}}/>
  </ListItemIcon>
  <ListItemText primary="Contacts" sx={{ color: "primary.dark"}}/>

</ListItemButton>



<ListItemButton >
  <ListItemIcon>
    <AccountCircleIcon sx={{ color: "primary.dark"}}/>
  </ListItemIcon>
  <ListItemText primary="Users" sx={{ color: "primary.dark"}} />

</ListItemButton>

        </List>
      </Box>
      </Box>
    </Drawer>

    {/* big screen menu */}
    <Box sx={{
      width: "300px", height: "100vh",bgcolor:"primary.main" ,display: {
        xs: "none",
        
        md: "block"
      }, borderRight: 2, borderColor: "#eee"
    }}>


      <Box sx={{ p: 4 }}>

        <Stack direction={'row'} spacing={1}>
          <Box>
            <AddHomeWorkIcon sx={{ color: "primary.dark", height: 30, fontSize: 50 }} />

          </Box>

          <Box><Typography variant="h6" sx={{ color: "primary.dark"}}> BetaHouse</Typography></Box>
        </Stack>
      </Box>




      {/* Menu list */}


      <Box sx={{ color: "primary.dark"}}>
        <List sx={{ width: '100%', maxWidth: 360,borderTop: 2, borderColor: "#eee" }}
          component="nav"

        >
          <ListItemButton>
            <ListItemIcon sx={{ color: "primary.dark"}}>
              <DashboardIcon />
            </ListItemIcon >
            <ListItemText primary="Dashboard" />
          </ListItemButton>
   <Link to={'home'} style={{textDecoration:"none"}}>

<ListItemButton
      sx={[selectedMenu ==='Home' && {bgcolor:"primary.dark",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('Home')
        console.log('Home clicked')
      }}>
  <ListItemIcon sx={{ color: "primary.dark"}}>
    <AssignmentIcon sx={[selectedMenu!='Home' && {color:'primary.dark'},selectedMenu==='Home'&& {color:'white'}]}/>
  </ListItemIcon>
  <ListItemText primary="Home"sx={[selectedMenu!='Home' && {color:'primary.dark'}]}/>
</ListItemButton>
</Link>

          <Link to={'client'} style={{textDecoration:"none"}}>

          <ListItemButton
                sx={[selectedMenu ==='Client' && {bgcolor:"primary.dark",color:"white",":hover":{
                  bgcolor:"primary.dark"
                }}]}
                onClick={()=>{
                  setMenu('Client')
                  // DrawerClose()
                  console.log('Client clicked')
                }}>
            <ListItemIcon sx={{ color: "primary.dark"}}>
              <AssignmentIcon sx={[selectedMenu!='Client' && {color:'primary.dark'},selectedMenu==='Client'&& {color:'white'}]}/>
            </ListItemIcon >
            <ListItemText primary="Client" sx={[selectedMenu!='Client' && {color:'primary.dark'}]}/>
          </ListItemButton>
          </Link>
          
          <Link to={'houses'} style={{textDecoration:"none"}}>

          <ListItemButton  sx={[selectedMenu ==='Houses' && {bgcolor:"primary.dark",color:"white",":hover":{
                  bgcolor:"primary.dark"
                }}]}
                onClick={()=>{
                  setMenu('Houses')
                  // DrawerClose()
                  console.log('Houses clicked')
                }}>
            <ListItemIcon >
              <InboxIcon sx={[selectedMenu!='Houses' && {color:'primary.dark'},selectedMenu==='Houses'&& {color:'white'}]}/>
            </ListItemIcon>
            <ListItemText primary="Houses" sx={[selectedMenu!='Houses' && {color:'primary.dark'}]}/>

          </ListItemButton>
          </Link>
          <Link to={'services'} style={{textDecoration:"none"}}>
            <ListItemButton 
           sx={[selectedMenu ==='Services' && {bgcolor:"primary.main",color:"white",":hover":{
            bgcolor:"primary.dark"
             }}]}
            onClick={()=>{
            setMenu('Services')
      
         
         }}>
            <ListItemIcon>
            <MiscellaneousServicesIcon sx={[selectedMenu!='Services' && {color:'primary.dark'},selectedMenu==='Services'&& {color:'white'}]}/>
            </ListItemIcon>
            <ListItemText primary="Services"sx={[selectedMenu!='Services' && {color:'primary.dark'}]}/>

          </ListItemButton>
      </Link>

      <Link to={'about'} style={{textDecoration:"none"}}>
          <ListItemButton  sx={[selectedMenu ==='About' && {bgcolor:"primary.main",color:"white",":hover":{
            bgcolor:"primary.dark"
             }}]}
            onClick={()=>{
            setMenu('About')
         
         
         }}>
            <ListItemIcon>
              <InfoIcon sx={[selectedMenu!='About' && {color:'primary.dark'},selectedMenu==='About'&& {color:'white'}]}/>
            </ListItemIcon>
            <ListItemText primary="About" sx={[selectedMenu!='About' && {color:'primary.dark'}]}/>

          </ListItemButton>
          </Link>


          <ListItemButton >
            <ListItemIcon>
              <ContactsIcon sx={{ color: "primary.dark"}}/>
            </ListItemIcon>
            <ListItemText primary="Contacts" />

          </ListItemButton>



          <ListItemButton >
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: "primary.dark"}}/>
            </ListItemIcon>
            <ListItemText primary="Users" />

          </ListItemButton>

        </List>
      </Box>
    </Box>
  </>
}