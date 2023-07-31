import { api } from "../../../apiConfig/Config"

/*
all operation Houses api 

post
update
delete
get
get by id

*/

export const getAllHouses = async()=>{

    return await api.get("/houses")
}

export const GetByIdHouse = async (id)=>{
    return await api.get(`/houses/${id}`)
}

export const  AddHouse = async (data)=>{
    return await api.post("/houses",data)
}

export const  DeleteHouse = async (id)=>{
    return await api.delete(`/houses/${id}`)
}

export const  UpdateHouse = async (id,data)=>{
    return await api.put(`/houses/${id}`,data)
}
