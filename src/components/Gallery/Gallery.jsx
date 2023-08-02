import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import GalleryList from "./GalleryList";
import { AddGallery, getAllGallery,UpdateGallery,DeleteGallery } from "./GalleryCrudOperation";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import {useQuery, useQueryClient ,useMutation} from "@tanstack/react-query";
import {GetData,AddData,UpdateData,DeleteData} from '../Shared/ReacQuery'
import ConfirmDelete from '../Delete/ConfirmDelete'
import {useDeleteHook} from '../Delete/DeleteHooks'
export const Gallery = ()=>{
    const [EditId, setEditId] = useState("");
    const [GallDelId, setGallDelId] = useState("");

    const queryclient = useQueryClient();
     const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()
      const [dailogOpen,setDailog]=useState(false)
       const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }
//Get All Gallery List
    const {data: gallery,isLoading,isError} = GetData('gallery','gallery');
//Get all gallery End

const {mutate,isLoading:mutateLoading} = AddData('gallery','gallery');

const {mutate:updateMutate,isLoading:updateLoading}=UpdateData(`/gallery/${EditId}`,'gallery');


const AddNewGallery = async (data)=>{
    if(EditId ==''){
             try{
                mutate(data)
                ToggleDailog()
                } catch( err){
                    console.log("Error Ocured ",err)
                    }
                    }
     else{          
   

        try {
            // await UpdateGallery(EditId, data);
            updateMutate(data)
            reset()
          } catch (error) {
            console.log("erro !", error);
          }
    }
}


const UpdateGalleryInfo= async (data) => {
    setValue("ImageTitle", data.ImageTitle);
    setValue("ImagePath", data.ImagePath);
    setEditId(data._id);
    ToggleDailog();
  };

const {mutate:delateMutate}=useMutation({
    mutationFn:(id)=>DeleteGallery(id),
    onSuccess:()=>{
        toast.success('Gallery has been deleted')
        DeleteHook.Toggle()
        queryclient.invalidateQueries({queryKey:['gallery']})
    },
    onError:(err)=>{
        toast.error(err.message)
    }


})
const DeleteHook=useDeleteHook()

const DeleteCheck=()=>{
    delateMutate(GallDelId)

}

const DeleteGalleryInfo= async(data)=>{
    DeleteHook.setMessage(data.ImageTitle)
    DeleteHook.Toggle();
    setGallDelId(data._id)

}

    return <>
   <Box p={4}>
   <ConfirmDelete open={DeleteHook.open} toggle={DeleteHook.Toggle} message={DeleteHook.message} confirm={DeleteCheck} />
    <Alert severity="info">Our Gallery</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={4}>
        <Typography variant="h6">List Gallery</Typography>
  
        <IconButton onClick={ToggleDailog}>
<AddHomeWorkIcon sx={{color:"primary.dark"}}/>
        </IconButton>
    </Box>

    <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New Gallery</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewGallery)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>
<Stack  spacing={2} direction={'column'}>
<TextField label="Image Title" {...register("ImageTitle")} variant="outlined" size="small" fullWidth/>

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
{isError ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              p: 10,
            }}
          >
            <Box>
              <ErrorOutlineOutlined sx={{ fontSize: "58px" }} />
              <Typography>Data noy found!</Typography>
            </Box>
          </Box>
        ) 
        : isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                p: 10,
              }}
            >
              <Box>
                <CircularProgress sx={{ fontSize: "58px",color:"primary.dark"}} />
                <Typography>Loading...</Typography>
              </Box>
            </Box>)
        :(
          <GalleryList
            deleteGallery={DeleteGalleryInfo}
            GalleryData={gallery?.data.Galary}
            update={UpdateGalleryInfo}
          />
        )}
   </Box>
    </>
}
export default Gallery