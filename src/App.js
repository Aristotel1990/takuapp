
import React from 'react';
import './App.css';
import Header from './Header';

export default({children})=>{
  return (

    <div className="App">
       <Header/>
       {children}
    </div>
  );
}
