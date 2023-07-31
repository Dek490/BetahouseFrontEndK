import {api} from '../../../apiConfig/Config'
export const getAll = async(endpoint,data)=>{
    return await api.get(endpoint,data)

}
export const PostNew = async(endpoint,data)=>{
    return await api.post(endpoint,data)

}
export const UpdateNew = async(endpoint,data)=>{
    return await api.put(endpoint,data)

}
export const Deleterow = async(endpoint)=>{
    return await api.delete(endpoint)

}
