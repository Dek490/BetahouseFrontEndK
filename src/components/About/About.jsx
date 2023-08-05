import { Button, Stack } from '@mui/material';
import React,{ useEffect , useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getAll,PostNew} from '../Shared/ApiCrud'
import {GetData} from '../Shared/ReacQuery'
export default function About() {
    const [fewdescription, setFewdescription] = useState('');
    const [moredescription, setMoredescription] = useState('');

    useEffect(() => {

        const GetAbout = async () => {
            try {
        const { data } = await GetData('/about','about')
          console.log(data)
          setFewdescription(data[0]?.FewDescription)
          setMoredescription(data[0]?.moredescription)
            } catch (error) {
                console.log(error.message)
                
            }

    
        }
        GetAbout();
    
      }, [])
    
     const {mutateAsync}= PostNew("/about","about")
    
      const handlepost =async () => {
        const data = {
            FewDescription:fewdescription,
            MoreDescription:moredescription
        }
        mutateAsync(data).then(()=>{console.log("data has been updated")})
    
      }
    
  return (
    <>
   <Button sx={{alignContent:'center',bgcolor:'primary.dark',width:'10%',marginLeft:'40%'}} onClick={handlepost}>Update</Button>
    <Stack direction={'column'} spacing={2}>
    <ReactQuill theme="snow" value={fewdescription} onChange={setFewdescription} />
    <ReactQuill theme="snow" value={moredescription} onChange={setMoredescription} />
     
    </Stack>
    </>
  )
}