import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider} from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { ErrorOutlineOutlined } from "@mui/icons-material";
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import HousesList from "./HousesList";
import { AddHouse, getAllHouses,DeleteHouse,UpdateHouse } from "./HousesCroudOperation";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import {useQuery, useQueryClient ,useMutation} from "@tanstack/react-query";
import ConfirmDelete from '../Delete/ConfirmDelete'
import {useDeleteHook} from '../Delete/DeleteHooks'
export const Houses = ()=>{

    const queryclient = useQueryClient();
    const [HousDelId,setHouseDelId]=useState("")
    const [Edit, setEdit] = useState("");
const {register,handleSubmit,setValue,reset,formState:{errors}} = useForm()
    const [dailogOpen,setDailog]=useState(false)
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }   

    //Get all Houses
    const {
        data: houses,
        isLoading,
        isError,
      } = useQuery({
        queryKey: ["houses"],
        queryFn: async () => await getAllHouses(),
        onError: async () => {
          toast.error("Can not find houses");
        },
      });
//Get all Houses end


// Add a new house
const {mutate,isLoading:mutateLoading} = useMutation({
    mutationFn: async (data) => await AddHouse(data),
    onSuccess: async ()=>{
        queryclient.invalidateQueries({queryKey:['house']})
        toast.success("Hause added successfully")
    },
    onError: async ()=>{
        toast.error("Adding New House Failed")
    },
})
const AddNewHouse = async (data) => {
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
    try {;
    updateMutate(data)
      reset();
    } catch (error) {
      console.log("erro !", error);
    }
}
  };

  const UpdateHouseInfo = async (data) => {
    setValue("type", data.type);
    setValue("Address", data.Address);
    setValue("Age", data.Age);
    setValue("Rent", data.Rent);
    setValue("Deposit", data.Deposit);
    setValue("Parking", data.Parking);
    setValue("Images", data.Images);
    setValue("Status", data.Status);
    setValue("Rooms", data.Rooms);
    setValue("Pathrooms", data.Pathrooms);
    setValue("Owner", data.Owner);

    setEdit(data._id);
    ToggleDailog();
  };

  const {mutate:updateMutate,isLoading:updateLoading}=useMutation({
    mutationFn: async (data)=>{
        return await UpdateHouse(Edit, data)
        
    },
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:['house']})
        toast.success('Data has been Updated')
        ToggleDailog()
        setEdit('')
    },
    onError:(err)=>{
        toast.error('Error Occured')

    }
    
})
const {mutate:delateMutate}=useMutation({
    mutationFn:(id)=>DeleteHouse(id),
    onSuccess:()=>{
        toast.success('House has been deleted')
        DeleteHook.Toggle()
        queryclient.invalidateQueries({queryKey:['house']})
    },
    onError:(err)=>{
        toast.error(err.message)
    }


})
const DeleteHook=useDeleteHook()

const DeleteCheck=()=>{
    delateMutate(HousDelId)

}

const DeleteHouseInfo= async(data)=>{
    DeleteHook.setMessage(data.Owner+"'s home")
    DeleteHook.Toggle();
    setHouseDelId(data._id)

}


    return <>
   <Box p={4}>

   <ConfirmDelete open={DeleteHook.open} toggle={DeleteHook.Toggle} message={DeleteHook.message} confirm={DeleteCheck} />
    <Alert severity="info">Our Houses</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={4}>
        <Typography variant="h6">List Houses</Typography>
  
        <IconButton onClick={ToggleDailog}>
<AddHomeWorkIcon sx={{color:"primary.dark"}}/>
        </IconButton>
    </Box>

    <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New House</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewHouse)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>



<TextField label="House Type" {...register("type")} variant="outlined" size="small" fullWidth/>
{/* <FormControl fullWidth {...register("type")}>
  <InputLabel variant="standard" htmlFor="uncontrolled-native">
        House Type
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: 'type',
            id: 'uncontrolled-native',
          }}
        >
          <option value="Villo">Villa</option>
          <option value="Apartment">Apartment</option>
          <option value="Bacwayne">Bacwayne</option>
        </NativeSelect>
      </FormControl> */}
<TextField label="Address" variant="outlined" {...register("Address")} size="small" fullWidth/>
<TextField label="Home Age" variant="outlined" {...register("Age")} size="small" fullWidth/>
<TextField label="Rent" variant="outlined" {...register("Rent")} size="small" fullWidth/>
<TextField label="Deposit" variant="outlined" {...register("Deposit")} size="small" fullWidth/>
<TextField label="Parking" variant="outlined" {...register("Parking")} size="small" fullWidth/>
<TextField label="Images" variant="outlined" {...register("Images")} size="small" fullWidth/>
<TextField label="Status" variant="outlined" {...register("Status")} size="small" fullWidth/>
<TextField label="Rooms" variant="outlined" {...register("Rooms")} size="small" fullWidth/>
<TextField label="Pathrooms" variant="outlined" {...register("Pathrooms")} size="small" fullWidth/>
<TextField label="Owner" variant="outlined" {...register("Owner")} size="small" fullWidth/>
    
    
    
    
    
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
          <HousesList
            deleteHouse={DeleteHouseInfo}
            HousesData={houses?.data.houses}
            update={UpdateHouseInfo}
          />
        )}
    
   </Box>
    </>
}
export default Houses