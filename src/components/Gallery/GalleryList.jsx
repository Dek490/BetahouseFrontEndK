import { Box,IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React from 'react'

export default function GallaryList({GalleryData,update,deleteGallery}) {

  // console.log(GalleryData)

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'ImageTitle',
          headerName: 'Image Title',
          width: 150,
          editable: true,
        },
        {
          field: 'ImagePath',
          headerName: 'Image Path',
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
              <IconButton onClick={()=>deleteGallery(params.row)}><DeleteForeverIcon sx={{color:"primary.dark"}}/></IconButton>
              
            </Box>
          }
        },
      ];

      
console.log(GalleryData)
      const rows= GalleryData ? GalleryData : null

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
