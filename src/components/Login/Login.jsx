import { Alert, Box, Button, Stack, TextField } from '@mui/material'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import React from 'react'
import { useMutation } from '@tanstack/react-query';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import jscookie from 'js-cookie'
// import { useNavigate } from "react-router-dom";
import { useUserContext } from '../ContextApi/userContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const usenavigate = useNavigate();

    const LoginValidate = yup.object({
        email: yup.string().required('Please enter your email address'),
        password: yup.string().required("Please enter your password"),
    
      });
    // const usenavigate = useNavigate();
      const {setIsLogin}=useUserContext()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(LoginValidate)
      });


    const {mutateAsync,isError,isLoading,error,data:response} = useMutation({
        mutationFn: async (data) => {
            return await axios.post('https://betahouse-backend1.vercel.app/login',data)
        },
        onError: async (err) => {
            console.log(err.message)
        }

    });

    const Login =async (data) => {
        mutateAsync(data).then((res) => {
            setIsLogin(true)
            jscookie.set('token',res.data.Token)
            usenavigate('/Dashboard')
            
            
        });
    }
  return (
    <>
    <Box >

        <Box component='form' onSubmit={handleSubmit(Login)} sx={{width:'250px',backgroundColor:"#eee",p:6,mx:'auto', mt:10,height:'300px',borderRadius:5}}>

            <Stack direction={'column'} spacing={2} sx={{mt:10}}>
               {isError && <Alert severity='error'>Incorrect Email or Password</Alert>}
                <Stack direction={'row'}>
                <EmailIcon sx={{fontSize:40, color:'primary.main'}}/>
                <TextField {...register('email')} size='small' label='Email' variant='outlined'></TextField>
                </Stack>
                <p>
             {errors.email && (
               <span style={{color:"#FA3F08"}}>{errors.email.message}</span>

               )}

            </p>
                <Stack direction={'row'}>
                <LockOpenIcon sx={{fontSize:40, color:'primary.main'}}/>
                <TextField type='password' {...register('password')} size='small' label='Password' variant='outlined'></TextField>

                </Stack>
                <p>
             {errors.password && (
               <span style={{color:"#FA3F08"}}>{errors.password.message}</span>

               )}

            </p>
                <Button type='submit'variant='contained' size='small' sx={{color:'white'}}>Login</Button>
            </Stack>
        </Box>
        
    </Box>
    
    
    </>
  )
}
