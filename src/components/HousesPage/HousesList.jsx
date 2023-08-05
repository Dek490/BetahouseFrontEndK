import { Box, IconButton, Chip, Typography, Divider, Stack, Avatar, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HousesList({ HousesData,update,deleteHouse }) {
    // console.log(HousesData,'cluesff')
    const [OpenDailog, setOpenDialog] = useState(false);
    const [houses, sethouses] = useState(false);
    const Toggle = () => {
      setOpenDialog(!OpenDailog)
    }

    const seemore = (data) => {

      sethouses(data)
        console.log("datadag", data)
        Toggle();

    }
{/* <Grid item xs= {12} sm={8} md={6} lg={4}> */}

    const columns = [
        // { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'images',
            headerName: 'Image Preview',
            width: 100,
            renderCell: (params) => {
                return  (
                  <>
                  <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=875&q=80" />
                  
    
                  </>

                )
                
                

            }
        },
        {
          field: 'type',
          headerName: 'House Type',
          width: 150,
          editable: true,
      },

        {
            field: 'Address',
            headerName: 'Address',
            width: 150,
            editable: true,
        },
        {
            field: 'Rent',
            headerName: 'Rent',
            width: 150,
            editable: true,
        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 150,
            editable: true,
        },
        {
          field: 'More Information',
          headerName: 'More Information',
          width: 150,
          editable: true,
          renderCell: (params) => {
              return <Box>
                  <Chip label="See More" size="small" variant="outlined" onClick={() => seemore(params.row)} />

              </Box>
          }
      },
        {
            field: "Actions",
            headerName: "Actions",
            width: 100,
            renderCell: (params) => {

                return <Box>

                    <IconButton onClick={() => update(params.row)}>

                        <ModeEditIcon sx={{ color: "primary.dark" }} />
                    </IconButton>
                    <IconButton onClick={() => deleteHouse(params.row)}><DeleteIcon sx={{ color: "error.main" }} /></IconButton>

                </Box>
            }
        },
        {
            field: 'ImagePreveiw',
            headerName: 'images',
            width: 100,
            renderCell: (params) => {
                return <Link to={`/Dashboard/imageupload/${params.row._id}/${params.row.type}`}>

                    <Chip label="Gallery" size="small" variant="outlined" />

                </Link>

            }
        }







    ];



    const rows = HousesData ? HousesData : null
 
    // </Grid>

    // console.log("rowww", rows)
    return (
        <>
            <Box sx={{ height: 400, width: '100%' }}>
                {/* <Dialog> */}
                <Dialog
                    open={OpenDailog}
                    onClose={Toggle}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        backdropFilter: "blur(5px) sepia(5%)",
                      }} PaperProps={{ sx: { borderRadius: "20px" }}}
                >
                    <DialogTitle  id="alert-dialog-title" sx={{textAlign:"center"}}>
                        <p>Full Information</p>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            <Box sx={{ p: 2, width: 500 }}>
                                <Stack direction={'column'} spacing={1}>
                                  <Stack direction={'row'} spacing={12}>
                                <Box sx={{ display: "flex", gap:2, alignItems: "center" }}><Typography variant="h6">House Type: </Typography>
                                        <Box>
                                            {houses?.type}
                                        </Box>

                                    </Box>
                                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><Typography variant="h6">Status: </Typography>
                                        <Box>
                                            {houses?.Status}
                                        </Box>

                                    </Box>

                                    </Stack>
                                    <Divider />
                                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><Typography variant="h6">Address: </Typography>
                                        <Box>
                                            {houses?.Address}
                                        </Box>

                                    </Box>
                                    <Divider />
                                    <Stack direction={'row'} gap={2}>

                                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><Typography variant="h6">Age: </Typography>
                                            <Box>
                                                {houses?.Age}
                                            </Box>

                                        </Box>
                                    </Stack>
                                    <Divider />
                                    <Stack direction={'row'} gap={20}>
                                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><Typography variant="h6">Rooms: </Typography>
                                            <Box>
                                                {houses?.Rooms}
                                            </Box>

                                        </Box>

                                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><Typography variant="h6">Pathrooms: </Typography>
                                            <Box>
                                                {houses?.Pathrooms}
                                            </Box>

                                        </Box>


                                    </Stack>
                                    <Divider />

                                    <Stack direction={'row'} gap={2}>


                                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><Typography variant="h6">Parking: </Typography>
                                            <Box>
                                                {houses?.Parking}
                                            </Box>

                                        </Box>


                                    </Stack>
                                    <Divider />
                                    <Stack direction={'row'} gap={20}>
                                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><Typography variant="h6">Rent: </Typography>
                                            <Box>
                                                {houses?.Rent}
                                            </Box>

                                        </Box>

                                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><Typography variant="h6">Deposit: </Typography>
                                            <Box>
                                                {houses?.Deposit}
                                            </Box>

                                        </Box>


                                    </Stack>
                                    <Divider />
                                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><Typography variant="h6">Owner: </Typography>
                                            <Box>
                                                {houses?.Owner}
                                            </Box>

                                        </Box>
                                    <Divider />

                                </Stack>
                            </Box>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button sx={{color: "primary.dark" }} onClick={Toggle}>Close</Button>

                    </DialogActions>
                </Dialog>
                {/* <Dialog end> */}

                <DataGrid

                    rows={rows}
                    columns={columns}

                    // material ui datagrid ma support gareenaayo by default _id 
                    //  si aan u xalino taas waxaan default row id  datagrid id to _id u badalno
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}

                    disableRowSelectionOnClick
                />
            </Box>
        </>
    )
}