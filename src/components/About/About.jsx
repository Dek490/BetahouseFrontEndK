import { Button, Stack } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {api} from '../../../apiConfig/Config'
export default function About() {
    const [fewdescription, setFewdescription] = useState('');
    const [moredescription, setMoredescription] = useState('');

    const Update =()=>{
        console.log(fewdescription,moredescription)
        


    }
    const handlepost =()=>{
        api.post('/about',{fewdescription,moredescription}).then((response)=>{
            console.log('Data has been posted')
        }).catch((error)=>{
            console.log(Error.message)
        })
    }

    
  return (
    <>
   <Button sx={{alignContent:'center',bgcolor:'primary.dark',width:'10%',marginLeft:'40%'}} onClick={handlepost}>Update</Button>
    <Stack direction={'row'} spacing={2}>
    <ReactQuill theme="snow" value={fewdescription} onChange={setFewdescription} />
    <ReactQuill theme="snow" value={moredescription} onChange={setMoredescription} />
     
    </Stack>
    </>
  )
}
