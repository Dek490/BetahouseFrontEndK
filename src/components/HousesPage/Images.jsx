import { TextField, Stack, Box, Button, Alert, Divider,Chip } from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {storage} from './Firebase/Config'
import Grid from '@mui/material/Grid'
import {ref,uploadBytes,getDownloadURL,listAll}from 'firebase/storage'
export default function ImagesFolder() {
    const { id, Type } = useParams()
    // useEffect( async() => {
    //     return await axios.get('api/Images')
    //   });

const[imagesUpload,setuploadimages]=useState('')
const[imageslist,setimageslistst]=useState([])
const imageLisREF=ref(storage,"images/")


const UploImages=()=>{
if(imagesUpload ==null)return;
const imagesREf=ref(storage,`images/${imagesUpload.name }`);
uploadBytes(imagesREf,imagesUpload).then(()=>{
    alert('images uploaded')
})
    };


    useEffect(()=>{
        listAll(imageLisREF).then((response)=>{
           // console.log(response)
           response.items.forEach((item)=>{
            getDownloadURL(item).then((url)=>{
                setimageslistst((prev)=>[...prev,url])
            })
           })
        })
    },[])

    return (
        <>
            <Box sx={{p:2}}>
            <Divider sx={{height:20}} />
                <Alert saverity="info">
                    <Stack direction={'row'} spacing={5}>
                    <Box>
                    Type :  {Type} 

                    </Box>
                    <Box>
                    Ref ID : {"   "} {id}
                    </Box>
                    </Stack>
                
                </Alert>
                <Divider sx={{height:20}} />

                <Stack direction={'row'} spacing={2}>
                    <TextField type='file' size='small' variant='outlined'  fullWidth onChange={(event)=>{setuploadimages(event.target.files[0])}}accept="/image/*"  />
                    <Button variant='contained' size='small' onClick={UploImages} >Upload</Button>
                </Stack>
                <Divider />
                
                <Box>
                <Divider sx={{height:20}} />
                    <Grid container spacing={2}>

                    {imageslist.map((url, index) => {

                        return <Grid url xs= {12} sm={12} md={6} lg={4}> 
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                key={index}
                                sx={{ height: 140 }}>
                                <img src={url}/> 
                                </CardMedia>
                            <CardContent>
                                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                                <Typography variant="body2" color="text.secondary">
                                    {url.title}
                
                                </Typography>
                                {/* <Chip label="See More" size="small" variant="outlined"  /> */}
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Delete</Button>
        
                            </CardActions>
                        </Card>
                        </Grid>

                    })}
                    </Grid>
                </Box>
                


            </Box>
            <Divider />

        </>
    )
}