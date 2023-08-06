import {
  Box,
  Stack,
  IconButton,
  Typography,
  Alert,
  TextField,
  Button,
  Divider
} from "@mui/material";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {useState } from "react";
import ClientList from "./ClientsList";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmDelete from '../Delete/ConfirmDelete'
import {useDeleteHook} from '../Delete/DeleteHooks'
import {GetData,AddData,UpdateData,DeleteData} from '../Shared/ReacQuery'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export const Clients = () => {
  const [CliDelId,setCliDelId]=useState("")

  // const isNotEmoji = (message = 'Emojis are not allowed.') => {
  //   return yup.string().test('is-not-emoji', message, (value) => {
  //     const emojiRegex = /(?:[\u2700-\u27BF]|(?:\uD83C[\uDF00-\uDFFF])|(?:\uD83D[\uDC00-\uDE4F])|[\uD800-\uDBFF]|[\uDC00-\uDFFF])/g;
  //     return !emojiRegex.test(value);
  //   });
  // };
  const ClientValidating = yup.object({

    

    ClientName: yup.string().required("Please Enter Client Name"),
    Logo: yup.string().required("Please Enter Client Logo"),

});

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClientValidating),
});
  //Dailog 



  
  const [dailogOpen, setDailog] = useState(false);
  const ToggleDailog = () => {
    setDailog(!dailogOpen);
  };
  const ToggleClean = () => {
    reset();
    setEdit("")
  };
//Dailog and ToggleDailog End

  const [Edit, setEdit] = useState("");

// Get All Client
  const {data: client,isLoading,isError} = GetData('/client','client');
// Get all clients End


// Add a client Start
const {mutate,isLoading:mutateLoading} = AddData('client','client')


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
      ToggleDailog()
      // setEdit('')
      reset();
    } catch (error) {
      console.log("erro !", error);
    }
}
  };
//Add Client End


//Update Client
const {mutate:updateMutate,isLoading:updateLoading}=UpdateData(`/client/${Edit}`,'client')
  const UpdateClientInfo = async (data) => {
    setValue("ClientName", data.ClientName);
    setValue("Logo", data.Logo);
    setEdit(data._id);
    ToggleDailog();
  };
//Update client End

// delete client
const {mutate:delateMutate}=DeleteData(`/client/${CliDelId}`)
const DeleteHook=useDeleteHook()

const DeleteCheck=()=>{
    delateMutate(CliDelId)
DeleteHook.Toggle()
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
          <p>
             {errors.ClientName && (
               <span style={{color:"#FA3F08"}}>{errors.ClientName.message}</span>

               )}

            </p>

                  <TextField
                    label="Client logo"
                    variant="outlined"
                    {...register("Logo")}
                    size="small"
                    fullWidth
                  />
              <p>
             {errors.Logo && (
               <span style={{color:"#FA3F08"}}>{errors.Logo.message}</span>

               )}

            </p>
                </Stack>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{
                ToggleDailog()
                ToggleClean()
              }}>Cancel</Button>
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
