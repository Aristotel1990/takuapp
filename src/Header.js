import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Shtim from './Shtim';
import { useStateValue } from "./StateProvider";
import { Drawer, Button } from 'antd';

import "./Header.css";

function Header({history}) {
  
    const [{ token ,errore},dispatch] = useStateValue();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      dispatch({
        type:'AUTH_ERROR',payload:null
      })
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };
  const  onsignout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        dispatch({
            type:'USER_NULL',
        })

    }
   
        if(token){
            return(
                <div id="menu1" className="dmenu db">
        <div className="menuleft ">
          
          <Link to="/feature" >
               <h1>Tido</h1>
                </Link>
         
                 
        </div>

       
        <div className="menuright">
          <ul className="menu1link">
          <li><a  onClick={showDrawer}>
        Shto Subjekt
      </a></li>
     
      <Drawer
                width={640}

        title="Shto subjekt"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
       <Shtim/>
      </Drawer>
            <li><Link to="/feature" >Home</Link></li>
            <li><Link to="/" onClick={onsignout}>Sign Out</Link></li>
          </ul>
        </div>
      </div>
              
               
            )
  
        }
        else{
            return(
                <div id="menu1" className="dmenu db">
                <div className="menuleft">
                         <Link >
                       <h1>Tido</h1>
                        </Link>
                </div>
        
               
                <div className="menuright">
                  <ul className="menu1link">
                    <li> <Link to="/signup">SignUp</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                  </ul>
                </div>
              </div>
                      
            )
            
            
        }
      
        
    }
  
   
export default Header
