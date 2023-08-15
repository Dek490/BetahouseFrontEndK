import { createContext,useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import jscookie from "js-cookie"
import jwtDecode from "jwt-decode";
const userContextApi= createContext();
export const UserContextProvider = ({children})=>{
    const [email,setEmail]=useState('')
    const [isLogin,setIsLogin]=useState(false)
    const usenavigate = useNavigate();

    const LogOut = () => {

        console.log('Log Out');
        jscookie.remove('token')
        setIsLogin(false);
        usenavigate("/")
    }

    useEffect(()=>{
        const token = jscookie.get('token')
        console.log("kani waa tokenkii :",token)

        if(!token){
            usenavigate('/')
        }
        else
        {
            const jwtDecoded = jwtDecode(token)
            setEmail(jwtDecoded.email)
            setIsLogin(true)

        }
    },[])

    return (
        <userContextApi.Provider value= {{email,isLogin,LogOut,setIsLogin}}>
            {children}

        </userContextApi.Provider>
    )


}

export const useUserContext =()=>{
    return useContext(userContextApi)
}

