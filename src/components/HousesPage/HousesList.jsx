import { Box,IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function HouseList({HousesData,update,deleteHouse}) {

  console.log(HousesData)

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
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
        {field: 'Age',
        headerName: 'House Age',
        width: 150,
        editable: true,
      },
      {field: 'Rent',
      headerName: 'House Rent',
      width: 150,
      editable: true,
    },
    {field: 'Deposit',
    headerName: 'Deposit',
    width: 150,
    editable: true,
  },
  {field: 'Parking',
  headerName: 'Parking',
  width: 150,
  editable: true,
},
{field: 'Images',
headerName: 'Images',
width: 150,
editable: true,
},
{field: 'Status',
headerName: 'Status',
width: 150,
editable: true,
},
{field: 'Rooms',
headerName: 'Rooms',
width: 150,
editable: true,
},
{field: 'Pathrooms',
headerName: 'Pathrooms',
width: 150,
editable: true,
},
{field: 'Owner',
headerName: 'Owner',
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
      <IconButton onClick={()=>deleteHouse(params.row)}><DeleteForeverIcon sx={{color:"primary.dark"}} /></IconButton>
      
    </Box>
  }
},
      ];

      
// console.log(HousesData)
      const rows= HousesData ? HousesData : null

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
