import React from 'react';
import { useStateValue } from "./StateProvider";

export default (ChildComponent)=>{
    const [{token}, dispatch] = useStateValue();
  
     if(!token){
        return <ChildComponent/>
        }
    
    }
