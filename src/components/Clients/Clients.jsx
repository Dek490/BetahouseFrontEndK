import {
  Box,
  Stack,
  IconButton,
  Typography,
  Alert,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import ClientList from "./ClientsList";
import {getAll,PostNew,UpdateNew,Deleterow} from '../Shared/ApiCrud'
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert";
import { toast } from "react-toastify";
import {useQuery, useQueryClient ,useMutation} from "@tanstack/react-query";
import ConfirmDelete from '../Delete/ConfirmDelete'
import {useDeleteHook} from '../Delete/DeleteHooks'
export const Clients = () => {
  const queryclient = useQueryClient();
  const [CliDelId,setCliDelId]=useState("")
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  //Dailog 
  const [dailogOpen, setDailog] = useState(false);
  const ToggleClean =()=>{
    reset();
    ToggleDailog();

  };
  const ToggleDailog = () => {
    setDailog(!dailogOpen);
  };
//Dailog and ToggleDailog End

  const [Edit, setEdit] = useState("");

// Get All Client
  const {
    data: client,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["client"],
    queryFn: async (data) => await getAll('/client',data),
    onError: async () => {
      toast.error("Can not find client");
    },
  });

  
// Get all clients End


// Add a client Start
const {mutate,isLoading:mutateLoading} = useMutation({
    mutationFn: async (data) => await PostNew('client',data),
    onSuccess: async ()=>{
        queryclient.invalidateQueries({queryKey:['client']})
        toast.success("Client added successfully")
    },
    onError: async ()=>{
        toast.error("Adding New Client Failed")
    },
})
  const AddNewClient = async (data) => {
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
    //   await UpdateClient(Edit, data);
    updateMutate(data)
      console.log("wala update garereyy datadaan !!");
      reset();
    } catch (error) {
      console.log("erro !", error);
    }
}
  };
//Add Client End


//Update Client
const {mutate:updateMutate,isLoading:updateLoading}=useMutation({
    mutationFn: async (data)=>{
        return await UpdateNew(`/client/${Edit}`, data)
        
    },
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:['client']})
        toast.success('Data has been Updated')
        ToggleDailog()
        setEdit('')
    },
    onError:(err)=>{
        toast.error('Error Occured')

    }
    
})
  const UpdateClientInfo = async (data) => {
    setValue("ClientName", data.ClientName);
    setValue("Logo", data.Logo);
    setEdit(data._id);
    ToggleDailog();
  };

const {mutate:delateMutate}=useMutation({
    mutationFn:(id)=>Deleterow(`/client/${id}`),
    onSuccess:()=>{
        toast.success('Client has been deleted')
        DeleteHook.Toggle()
        queryclient.invalidateQueries({queryKey:['client']})
    },
    onError:(err)=>{
        toast.error(err.message)
    }


})
const DeleteHook=useDeleteHook()

const DeleteCheck=()=>{
    delateMutate(CliDelId)

}

const DeleteClientInfo= async(data)=>{
    DeleteHook.setMessage(data.ClientName)
    DeleteHook.Toggle();
    setCliDelId(data._id)

}


  return (
    <>
      <Box p={4}>
      <ConfirmDelete open={DeleteHook.open} toggle={DeleteHook.Toggle} message={DeleteHook.message} confirm={DeleteCheck} />
        <Alert severity="info">Our Clients</Alert>
        <Box sx={{ display: "flex", justifyContent: "space-between" }} my={4}>
          <Typography variant="h6">List Clients</Typography>

          <IconButton onClick={ToggleDailog}>
            <AddHomeWorkIcon sx={{color:"primary.dark"}} />
          </IconButton>
        </Box>

        <Dialog open={dailogOpen} onClose={ToggleDailog}>
          <DialogTitle>New Client</DialogTitle>
          <Box component={"form"} onSubmit={handleSubmit(AddNewClient)}>
            <DialogContent>
              <Box sx={{ width: "400px" }} mt={2}>
                <Stack spacing={2} direction={"column"}>
                  <TextField
                    label="Client Name"
                    {...register("ClientName")}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />

                  <TextField
                    label="Client logo"
                    variant="outlined"
                    {...register("Logo")}
                    size="small"
                    fullWidth
                  />
                </Stack>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={ToggleDailog}>Cancel</Button>
              <Button variant="contained" disabled={mutateLoading} type="submit" size="small">
                Submit
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        <Divider />
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
          <ClientList
            deleteClient={DeleteClientInfo}
            clientsData={client?.data.Client}
            update={UpdateClientInfo}
          />
        )}
      </Box>
    </>
  );
};
export default Clients;
