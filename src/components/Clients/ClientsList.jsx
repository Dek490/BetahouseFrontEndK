import { Box, Button ,IconButton} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
export default function ClientList({clientsData,update,deleteClient}) {
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'ClientName',
          headerName: 'Client Name',
          width: 150,
          editable: true,
        },
        {
          field: 'Logo',
          headerName: 'Logo',
          width: 150,
          editable: true,
        },
        {
          field:"Actions",
          headerName:"Actions",
          width:200,
          renderCell:(params)=>{

            return <Box>

              <IconButton onClick={()=>update(params.row)}>

                <BorderColorIcon sx={{color:"primary.dark"}}/>
              </IconButton>
              <IconButton onClick={()=>deleteClient(params.row)}><DeleteForeverIcon sx={{color:"primary.dark"}} /></IconButton>
              
            </Box>
          }
        },

      ];

      

      const rows= clientsData ? clientsData : null

  return (
   <>
       <Box sx={{ height: 400, width: '100%' }}>
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
