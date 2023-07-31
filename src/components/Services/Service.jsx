import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import ServicesList from "./ServicesList";
import { AddService, getAllServices,UpdateService,DeleteService } from "./ServicesCrudOperation";
import {useQuery, useQueryClient ,useMutation} from "@tanstack/react-query";
import { toast } from "react-toastify";
import ConfirmDelete from '../Delete/ConfirmDelete'
import {useDeleteHook} from '../Delete/DeleteHooks'
import { useForm } from "react-hook-form";
export const Service = ()=>{
    const queryclient = useQueryClient();
    const [Edit, setEdit] = useState("");
    const [SerDelId,setSerDelId]=useState("")
    
const {register,handleSubmit,setValue,reset,formState:{errors}} = useForm()
    const [dailogOpen,setDailog]=useState(false)
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }
   
    const {
        data: service,
        isLoading,
        isError,
      } = useQuery({
        queryKey: ["sevice"],
        queryFn: async () => await getAllServices(),
        onError: async () => {
          toast.error("Can not find service");
        },
      });

      const {mutate,isLoading:mutateLoading} = useMutation({
        mutationFn: async (data) => await AddService(data),
        onSuccess: async ()=>{
            queryclient.invalidateQueries({queryKey:['service']})
            toast.success("Service added successfully")
        },
        onError: async ()=>{
            toast.error("Adding New Service Failed")
        },
    })
      const AddNewService = async (data) => {
        if (Edit == "") {
          try {
            mutate(data);
            console.log("Data has been saved");
            ToggleDailog();
          } catch (err) {
            console.log("error ayaa jira ", err);
          }
        }
        else {
        try {
        //   await UpdateService(Edit, data);
        updateMutate(data)
          reset();
        } catch (error) {
          console.log("erro !", error);
        }
    }
      };

const {mutate:updateMutate,isLoading:updateLoading}=useMutation({
    mutationFn: async (data)=>{
        return await UpdateService(Edit, data)
        
    },
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:['service']})
        toast.success('Data has been Updated')
        ToggleDailog()
        setEdit('')
    },
    onError:(err)=>{
        toast.error('Error Occured')

    }
    
})
  const UpdateServiceInfo = async (data) => {
    setValue("Title", data.Title);
    setValue("Icon", data.Icon);
    setValue("Description", data.Description);
    setEdit(data._id);
    ToggleDailog();
  };


  const {mutate:delateMutate}=useMutation({
    mutationFn:(id)=>DeleteService(id),
    onSuccess:()=>{
        toast.success('Service has been deleted')
        DeleteHook.Toggle()
        queryclient.invalidateQueries({queryKey:['service']})
    },
    onError:(err)=>{
        toast.error(err.message)
    }


})
const DeleteHook=useDeleteHook()

const DeleteCheck=()=>{
    delateMutate(SerDelId)

}

const DeleteServiceInfo= async(data)=>{
    DeleteHook.setMessage(data.Title)
    DeleteHook.Toggle();
    setSerDelId(data._id)

}




    return <>
   <Box p={4}>

   <ConfirmDelete open={DeleteHook.open} toggle={DeleteHook.Toggle} message={DeleteHook.message} confirm={DeleteCheck} />


    <Alert severity="info">Our Service</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={4}>
        <Typography variant="h6">List Service</Typography>
  
        <IconButton onClick={ToggleDailog}>
<AddHomeWorkIcon sx={{color:"primary.dark"}}/>
        </IconButton>
    </Box>

    <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New Service</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewService)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>



<TextField label="Title" {...register("Title")} variant="outlined" size="small" fullWidth/>

<TextField label="Icon" variant="outlined" {...register("Icon")} size="small" fullWidth/>
<TextField label="Description" variant="outlined" {...register("Description")} size="small" fullWidth/>
    
    
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
          <ServicesList
            deleteService={DeleteServiceInfo}
            ServiceData={service?.data.Service}
            update={UpdateServiceInfo}
          />
        )}
    
   </Box>
    </>
}
export default Service