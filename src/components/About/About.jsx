import { Alert, Button, Stack } from '@mui/material';
import React,{ useEffect , useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getAll,PostNew} from '../Shared/ApiCrud'
import {GetData,AddData} from '../Shared/ReacQuery'
import { toast } from "react-toastify";
export default function About() {
    const [fewdescription, setFewdescription] = useState('');
    const [moredescription, setMoredescription] = useState('');

    useEffect(() => {

        const GetAbout = async () => {
            try {
        const { data } = await getAll('about')
          console.log(data)
          setFewdescription(data[0]?.FewDescription)
          setMoredescription(data[0]?.MoreDescription)
            } catch (error) {
                console.log(error.message)
                
            }

    
        }
        GetAbout();
    
      }, [])
    
      const { mutateAsync } = AddData("/about", "about")

      const UpdateAbout = async () => {
        const data = {
          FewDescription:fewdescription,
          MoreDescription: moredescription
        }
        mutateAsync(data)
    
      }
    
  return (
    <>
   
    <Stack direction={'column'} spacing={2} sx={{marginTop:2,marginLeft:2}}>
      <Stack direction={'row'}>
    <Alert sx={{bgcolor:'primary.dark',color:'white',width:650}}>Few Description</Alert>
    <Button sx={{alignContent:'center',bgcolor:'primary.dark',width:'10%',marginLeft:'10%'}} onClick={UpdateAbout}>Update</Button>
</Stack>
    <ReactQuill theme="snow" value={fewdescription} onChange={setFewdescription} style={{width:'64%'}}/>
    <Alert sx={{bgcolor:'primary.dark',color:'white',width:650,marginTop:100}}>More Description</Alert>
    <ReactQuill theme="snow" value={moredescription} onChange={setMoredescription} style={{marginTop:10,width:'64%'}}/>
     
    </Stack>
    </>
  )
}