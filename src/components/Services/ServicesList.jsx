import { Box ,IconButton} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
export default function ServicesList({ServiceData,deleteService,update}) {

//   console.log(ServiceData)

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'Title',
          headerName: 'Title',
          width: 150,
          editable: true,
        },
        {
          field: 'Icon',
          headerName: 'Icon',
          width: 150,
          editable: true,
        },
        {
            field: 'Description',
            headerName: 'Description',
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
                <IconButton onClick={()=>deleteService(params.row)}><DeleteForeverIcon sx={{color:"primary.dark"}} /></IconButton>
                
              </Box>
            }
          },
      ];

      
// console.log(ServiceData)
      const rows= ServiceData ? ServiceData : null

  return (
   <>
       <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
    
        rows={rows}
        columns={columns}

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
