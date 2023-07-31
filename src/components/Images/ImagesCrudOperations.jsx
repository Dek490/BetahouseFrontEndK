import { api } from "../../../apiConfig/Config"

/*
all operation images api 

post
update
delete
get
get by id

*/

export const getAllImages = async()=>{

    return await api.get("/images")
}

export const GetByIdImage = async (id)=>{
    return await api.get(`/images/${id}`)
}

export const  AddImage = async (data)=>{
    return await api.post("/images",data)
}

export const  DeleteImage = async (id)=>{
    return await api.delete(`/images/${id}`)
}

export const  UpdateImage = async (id,data)=>{
    return await api.put(`/images/${id}`,data)
}
