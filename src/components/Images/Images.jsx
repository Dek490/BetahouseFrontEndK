import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import ImagesList from "./ImagesList";
import { AddImage, getAllImages } from "./ImagesCrudOperations";
import { useForm } from "react-hook-form";
export const Images = ()=>{
const {register,handleSubmit,reset,formState:{errors}} = useForm()
    const [dailogOpen,setDailog]=useState(false)
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }

    const [Images,setImages] = useState([])
   
useEffect(()=>{
    const allImages =  async ()=>{
        
        const {data} = await  getAllImages()
    
        console.log('Xogta',data)

        setImages(data)
    }

    allImages()


},[])


const AddNewImage = async (data)=>{
    try{
  await AddImage(data)
console.log("Data has been saved")
ToggleDailog()
    } catch( err){
console.log("Error Ocured ",err)

    }
}
    return <>
   <Box p={4}>

    <Alert severity="info">Our Images</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={4}>
        <Typography variant="h6">List Images</Typography>
  
        <IconButton onClick={ToggleDailog}>
<AddHomeWorkIcon sx={{color:"green"}}/>
        </IconButton>
    </Box>

    <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New Image</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewImage)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>



<TextField label="Home ID" {...register("HomeID")} variant="outlined" size="small" fullWidth/>

<TextField label="Image Path" variant="outlined" {...register("ImagePath")} size="small" fullWidth/>
    
    
    </Stack>

    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ToggleDailog}>Cancel</Button>
          <Button variant="contained" type="submit"  size="small">Submit</Button>
 
        </DialogActions>

        </Box>
      </Dialog>

<Divider/>
 {Images ? <ImagesList imagesData={Images}/> : null }
    
   </Box>
    </>
}
export default Images