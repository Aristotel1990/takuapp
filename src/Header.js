import React from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from "./StateProvider";
import "./Header.css";

function Header({history}) {
  
    const [{ token ,errore},dispatch] = useStateValue();

  const  onsignout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        dispatch({
            type:'USER_NULL',
        })

    }
   
        if(token){
            return(<div>
                <div className="header" >
                   <Link to="/feature" >Home</Link>
                   <Link to="/" onClick={onsignout}>Sign Out</Link>{"   "}
               </div>
            </div>
               
            )
  
        }
        else{
            return(
               <div  className="header">
                   <Link to="/signup">SignUp</Link>
                    <Link to="/signin">Sign In</Link>
                    <br/>
                </div>
            )
            
            
        }
    }
   

export default Header
