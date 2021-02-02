import React,{useEffect} from 'react'
import { Popconfirm,Button,Alert,Space,Popover } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import ModalData from './ModalData';
import ModalStatus from './ModalStatus';
import ModalFalse from './ModalFalse';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useStateValue } from "./StateProvider";
import { MDBDataTable } from "mdbreact";
import 'bootstrap-css-only/css/bootstrap.min.css';
import FalseStatus from './FalseStatus';
import Shtim from './Shtim';
import moment from'moment';

function NewTable({history}) {
    const [{ basket, user,token }, dispatch] = useStateValue();
    const arr =basket.map(record=>record? {...record,komenti:(<Popover  content={record.komenti} title="Komenti" trigger="hover">
    {<Button>Komenti</Button>}
  </Popover>),action1:(<div>{user===record.user ?(<div ><ModalData history={history} record={record}/>{" "}
    <Popconfirm 
    onConfirm={()=>{
     axios.post(`https://taku-app.herokuapp.com//${record._id}`)
     dispatch({
      type:'DELETE_ITEM',
      id:record._id
     })
     history.push('/feature')
   }}
    icon={<QuestionCircleOutlined 
    style={{ color: 'red' }} />}>
   <a href="#">Delete</a>
 </Popconfirm>
   </div>):(<div ><ModalFalse  record={record}/>{" "}
    <Popconfirm 
    icon={<QuestionCircleOutlined 
    style={{ color: 'red' }} />}>
   <a href="#">Delete</a>
 </Popconfirm>
   </div>)}</div>),action2:(<div>{user===record.user ?(<div > <ModalStatus record={record} history={history}/>
            </div>):(<div > <FalseStatus record={record}/>
            </div>)}</div>)}:record)
  
  
  const time =moment().format();

  const bbb= arr.filter(record=>moment(record.date).isSame(time,'day') ) 


 
  
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
            width: 50
          },
          {
            label: 'Edito/Fshi',
            field: 'action1',
            sort: 'asc',
            width: 150
          },
        
          {
            label: 'Modifikuesi',
            field: 'user',
            sort: 'asc',
            width: 60
          },
          {
            label: 'Data',
            field: 'date',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Statusi',
            field: 'action2',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Status',
            field: 'status',
            sort: 'asc',
            width: 150
          },
          
        ],
        rows: arr
      };

 async function shtyComp(){
    if(bbb){
      await
        dispatch({
          type:'DATE',
          item:bbb
        })
        console.log(bbb)
      }else{
        dispatch({
          type:'DATE',
          item:null
        })
      }
history.push('/comp')
  }
useEffect(() => {
  async function merr(){
  if(!token){
    history.push('/')
  }else{
   
      const response = await axios.get('https://taku-app.herokuapp.com//data');
      dispatch({type:'MERR_TEDHENA',item:response.data,user:localStorage.getItem('user')})
      console.log('teli')
      
    }
  }
  
  merr();
   }, [])




    return<>
  <div>{bbb.length>0 ?(<div><Alert
      message="Info Text"
      description="Ke reminder per bizneset"
      type="info"
      action={
        <Space direction="vertical">
          <Button onClick={shtyComp}  size="small" type="primary">
            Accept
          </Button>
        </Space>
      }
      closable
    />
    <h1></h1>
    <Shtim/>
    <MDBDataTable
    striped
    bordered
    hover
    data={data}
    /> </div>):(<div> <Shtim/>
      <MDBDataTable
      striped
      bordered
      hover
      data={data}/> </div>)
  
    }
    </div>
</>
}
export default NewTable;
