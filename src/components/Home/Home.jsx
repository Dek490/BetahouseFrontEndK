import { Alert, Box, Breadcrumbs, Button, Grid, Stack, TextField,Link ,Typography  } from '@mui/material';
import React, { useState } from 'react';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useForm } from 'react-hook-form';
import {getAll,PostNew} from  '../Shared/ApiCrud'
// import { getAll,AddData  } from '../../../Shared/apiCRUD';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const Home = () => {
    const [Datada, setdata]=useState()
    const [dailogOpen,setDailog]=useState(false)
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }

    const HomeValidating = yup.object({

    

        email: yup.string().email().required("Please Enter Email"),
        logo: yup.string().required("Please Enter Logo"),
        location: yup.string().required("Please Enter location"),
        complain_email: yup.string().email().required("Please Enter Complain email"),
        complain_phone: yup.string().required("Please Enter complain phone"),
        facebook: yup.string().required("Please Enter Facebooke Account"),
        tiktok: yup.string().required("Please Enter Tiktok Account"),
    
    });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(HomeValidating),
});
  // get data
  useEffect(() => {
    const HomeSetting = async () => {
      const {data} = await getAll('/info');
      setdata(data[0])     
      setValue('email', data[0]?.email);
      setValue('logo', data[0]?.logo);
      setValue('location', data[0]?.location);
      setValue('complain_email', data[0]?.complain_email);
      setValue('complain_phone', data[0]?.complain_phone);
      setValue('facebook', data[0]?.facebook);
      setValue('tiktok', data[0]?.tiktok);
      setValue('instagram', data[0]?.instagram);
      setValue('twitter', data[0]?.twitter);
      setValue('HeroSectionTitle', data[0]?.HeroSectionTitle);
      setValue('HeroSectionDescription', data[0]?.HeroSectionDescription);
      setValue('HeroImage', data[0]?.HeroImage);
      setValue('FooterText', data[0]?.FooterText);
console.log(data)
  

    };
    HomeSetting();
  }, []);


  // const { mutateAsync } = PostQuery('/homesitting', 'homesitting');
  const HomeSettingPost = async (data) => {
    console.log(data);
    try {
      await PostNew('/info',data).then(() => {
        toast.success('Updated successfully');
        ToggleDailog();
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
     {/* breadcrumbs */}

     {/* <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Dashboard
        </Link>

        <Typography color="text.primary">Home setting</Typography>
      </Breadcrumbs> */}


      {/* end */}

<Stack direction={'row'}>
      <Card sx={{ width:400,bgcolor:'primary.dark', marginTop:5,marginLeft:15 }} >
      <CardContent>
        <Typography sx={{ fontSize: 14,color:'white' }} color="text.secondary" gutterBottom>
          <p style={{textAlign:"center",fontSize:20}}>Contacts</p>
        </Typography>
        <Typography sx={{color:'primary.main'}} variant="h6" component="div">
         <span><b>Email:</b></span> {Datada?.email}
        </Typography>
        <Typography sx={{color:'primary.main'}} >
        <span><b>Logo:</b></span> {Datada?.logo}
        </Typography>
        <Typography sx={{color:'primary.main'}} >
        <span><b>Location:</b></span> {Datada?.location}
        </Typography>
        <Typography sx={{color:'primary.main'}} color="text.secondary">
        <span><b>complain_email:</b></span> {Datada?.complain_email}
        </Typography>
        <Typography sx={{color:'primary.main'}} color="text.secondary">
        <span><b>complain_phone:</b></span> {Datada?.complain_phone}
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ width:400,bgcolor:'primary.main', marginTop:5,marginLeft:5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14,color:'white' }} color="text.secondary" gutterBottom>
          <p style={{textAlign:"center",fontSize:20}}>Our Social Media</p>
        </Typography>
        <Typography sx={{color:'primary.dark'}} variant="h6" component="div">
         <span><b>Facebook:</b></span> {Datada?.facebook}
        </Typography>
        <Typography sx={{color:'primary.dark'}} color="text.secondary">
        <span><b>Twitter:</b></span> {Datada?.twitter}
        </Typography>
        <Typography sx={{color:'primary.dark'}} color="text.secondary">
        <span><b>Tiktok:</b></span> {Datada?.tiktok}
        </Typography>
        <Typography sx={{color:'primary.dark'}} color="text.secondary">
        <span><b>Instagram:</b></span> {Datada?.instagram}
        </Typography>
      </CardContent>
    </Card>
</Stack>
<Stack direction={'row'}>
<Card sx={{ width:400,bgcolor:'primary.main', marginTop:5,marginLeft:15 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14,color:'white' }} color="text.secondary" gutterBottom>
          <p style={{textAlign:"center",fontSize:20}}>Hero Section</p>
        </Typography>
        <Typography sx={{color:'primary.dark'}} variant="h6" component="div">
         <span><b>Hero Section Title:</b></span> {Datada?.HeroSectionTitle}
        </Typography>
        <Typography sx={{color:'primary.dark'}} color="text.secondary">
        <span><b>Hero Section Description:</b></span> {Datada?.HeroSectionDescription}
        </Typography>
        <Typography sx={{color:'primary.dark'}} color="text.secondary">
        <span><b>Hero Image:</b></span> {Datada?.HeroImage}
        </Typography>
        <Typography sx={{color:'primary.dark'}} color="text.secondary">
        <span><b>Footer Text:</b></span> {Datada?.FooterText}
        </Typography>
      </CardContent>
    </Card>
    <Button onClick={ToggleDailog} sx={{bgcolor:'primary.dark',width:200, height:100,margin:10,":hover":{
        bgcolor:"primary.main",
        color:"primary.dark"
      }}}> Click To Update </Button>

</Stack>






      <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>Home Setting</DialogTitle>
      
        <DialogContent> 
      <Box p={4}>
      <Alert severity="info">Home Setting</Alert>
        <Box component={'form'} onSubmit={handleSubmit(HomeSettingPost)}>
          <Box sx={{ width: '200px,' }} mt={2}>
       
            <Grid container spacing={2} sx={{marginTop:"5px"}}>
              
              <Grid xs={12} md={4} m={2}>
                <TextField label='Email' id='email' name='email' {...register('email')} variant='standard' size='small' fullWidth/>
                <p>
             {errors.email && (
               <span style={{color:"#FA3F08"}}>{errors.email.message}</span>

               )}

            </p>
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField  label='Logo'  id='logo' {...register('logo')} variant='standard' size='small' fullWidth  />
                <p>
             {errors.logo && (
               <span style={{color:"#FA3F08"}}>{errors.logo.message}</span>

               )}

            </p>
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='location' {...register('location')} variant='standard' size='small' fullWidth/>
                <p>
             {errors.location && (
               <span style={{color:"#FA3F08"}}>{errors.location.message}</span>

               )}

            </p>
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='complain_email' {...register('complain_email')} variant='standard' size='small' fullWidth />
                <p>
             {errors.complain_email && (
               <span style={{color:"#FA3F08"}}>{errors.complain_email.message}</span>

               )}

            </p>
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='complain_phone' {...register('complain_phone')} variant='standard' size='small' fullWidth/>
                <p>
             {errors.complain_phone && (
               <span style={{color:"#FA3F08"}}>{errors.complain_phone.message}</span>

               )}

            </p>
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='facebook' {...register('facebook')} variant='standard' size='small' fullWidth />
                <p>
             {errors.facebook && (
               <span style={{color:"#FA3F08"}}>{errors.facebook.message}</span>

               )}

            </p>
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='tiktok' {...register('tiktok')}  variant='standard'  size='small' fullWidth />
                <p>
             {errors.tiktok && (
               <span style={{color:"#FA3F08"}}>{errors.tiktok.message}</span>

               )}

            </p>
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='instagram' {...register('instagram')} variant='standard' size='small' fullWidth />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='twitter' {...register('twitter')} variant='standard' size='small' fullWidth />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='HeroSectionTitle' {...register('HeroSectionTitle')} variant='standard' size='small' fullWidth />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='HeroSectionDescription' {...register('HeroSectionDescription')} variant='standard' size='small' fullWidth />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='HeroImage' {...register('HeroImage')} variant='standard' size='small' fullWidth />
              </Grid>
              <Grid xs={12} md={4} m={2}>
                <TextField label='FooterText' {...register('FooterText')} variant='standard' size='small' fullWidth
                />
              </Grid>
            </Grid>
            <Button type='submit' variant='contained' size='small' fullWidth> Update </Button>
           
          </Box>
        </Box>
      </Box>

        </DialogContent>
   
            
</Dialog>
    </>
  );
};

export default Home;
