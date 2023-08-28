import { createContext, useEffect, useState} from "react";

const AuthContext = createContext([{}, ()=>{} ]);

const AuthProvider = ({children})=> {
    const [state,setState] = useState({info:JSON.parse(sessionStorage.getItem("user")) || null,
    socket:null})
    
    // useEffect(()=>{
    //     let val = true
    //     if(val){
    //         setState((prevVal)=>({...prevVal,username:sessionStorage.getItem("user")}))
    //     }
    //     return ()=> {
    //         val = false
    //     }
    // },[state.username])
    console.log(state.info)

    return(
        <AuthContext.Provider value={[state,setState]}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthProvider}

