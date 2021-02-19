import React,{useEffect, useState} from 'react'
import 'antd/dist/antd.css';
import { useStateValue } from "./StateProvider";
import { MDBDataTable } from "mdbreact";
import 'bootstrap-css-only/css/bootstrap.min.css';
function DateCompare({history}) {
  const [{ compDate,token }, dispatch] = useStateValue();
  const [state, setState] = useState([])

    
  const data = {
    columns: [
      {
        label: 'Name',
        field: 'emri',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Subjeki',
        field: 'subjekti',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Nr.cel',
        field: 'nr',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Qyteti',
        field: 'qyteti',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Komenti',
        field: 'komenti',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Edito/Fshi',
        field: 'action1',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Statusi',
        field: 'action2',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Modifikuesi',
        field: 'user',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Data',
        field: 'date',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 150
      },
      
    ],
    rows: state
  };

  useEffect(() => {
    if(!token){
      history.push('/')
    }else{
     
      setState(compDate)
        
      }

 
  }, [])

  return (
    <div>
          {compDate ?(<div >
         
      <MDBDataTable
    striped
    bordered
    hover
    data={data}
    />
    </div>
  ):(<div><h1>Ska gje data</h1></div>)}
  
  </div>)
}

export default DateCompare
