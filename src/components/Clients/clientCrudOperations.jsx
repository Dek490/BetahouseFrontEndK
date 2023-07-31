import { api } from "../../../apiConfig/Config"

/*
all operation client api 

post
update
delete
get
get by id

*/

export const getAllClient = async()=>{

    return await api.get("/client")
}

export const GetByIdClient = async (id)=>{
    return await api.get(`/client/${id}`)
}

export const  AddClient = async (data)=>{
    return await api.post("/client",data)
}

export const  DeleteClient = async (id)=>{
    return await api.delete(`/client/${id}`)
}

export const  UpdateClient = async (id,data)=>{
    return await api.put(`/client/${id}`,data)
}
