import {getAll,PostNew,UpdateNew,Deleterow} from './ApiCrud'
import {useQuery, useQueryClient ,useMutation} from "@tanstack/react-query";
import { toast } from "react-toastify";

export const GetData =(edpoint,querykey)=>{
    return useQuery({
        queryKey:([querykey]),
        queryFn:()=>getAll(edpoint),
        onError: async (err)=>{
            toast.error(err.message)
            
        },
    })
    
}

export const AddData =(edpoint,querykey)=>{
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => await PostNew(edpoint,data),
        onSuccess: async ()=>{
          queryclient.invalidateQueries({queryKey:[querykey]})
          toast.success("client added successfully")
      },
      onError: async ()=>{
          toast.error("Adding New Client Failed")
      },
    })
    
}

export const UpdateData =(edpoint,querykey)=>{
    const queryclient = useQueryClient();
    return useMutation({
    mutationFn: async (data)=> UpdateNew(edpoint,data),
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:[querykey]})
        toast.success('Data has been Updated')
    },
    onError:(err)=>{
        toast.error(err,'Error Occured')

    }
})
}

export const DeleteData =(edpoint,querykey)=>{
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn:(data)=>Deleterow(edpoint,data),
        onSuccess:()=>{
            toast.success('data has been deleted')
            queryclient.invalidateQueries({queryKey:[querykey]})
        },
        onError:(err)=>{
            toast.error(err.message)
        }
    
    })
    
}

