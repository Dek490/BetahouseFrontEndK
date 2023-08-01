import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function About() {
    const [fewdescription, setFewdescription] = useState('');
    const [moredescription, setMoredescription] = useState('');

    const Update =()=>{
        console.log(fewdescription,moredescription)
        


    }

    
  return (
    <>
   <Button sx={{alignContent:'center',bgcolor:'primary.dark',width:'10%',marginLeft:'40%'}} onClick={Update}>Update</Button>
    <Stack direction={'row'} spacing={2}>
    <ReactQuill theme="snow" value={fewdescription} onChange={setFewdescription} />
    <ReactQuill theme="snow" value={moredescription} onChange={setMoredescription} />
     
    </Stack>
    </>
  )
}
