import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

export default function ImageList({imagesData}) {

  console.log(imagesData)

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'HomeID',
          headerName: 'Home ID',
          width: 150,
          editable: true,
        },
        {
          field: 'ImagePath',
          headerName: 'Image Path',
          width: 150,
          editable: true,
        },
      ];

      
console.log(imagesData)
      const rows= imagesData ? imagesData : null

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
