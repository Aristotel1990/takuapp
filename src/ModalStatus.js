import React,{useState} from 'react'
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { useStateValue } from "./StateProvider";
import axios from 'axios';
import './status.css';

function ModalStatus(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [{ user}, dispatch] = useStateValue();
    const {_id}=props.record;
    const{date}=props.record;
    const time='0000-00-00'
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    props.history.push('/')

  };

  const handleCancel = () => {
    setIsModalVisible(false);
    props.history.push('/')

  };
  const onstatus2=()=>{
    const nrSt=2;
       axios.post(`https://taku-app.herokuapp.com/status/${_id}`,{status:nrSt,user:user,date:date})
       dispatch({
          type: "UPDATE_STATUS",
          id:_id,
          status:2,
          user:user,
          date:date,
        })
        props.history.push('/')

        setIsModalVisible(false);
      
  }
  const onstatus1=()=>{
    const nrSt=1;

    axios.post(`https://taku-app.herokuapp.com/status/${_id}`,{status:nrSt,user:user,date:time});

      dispatch({
        type: "UPDATE_STATUS",
        id:_id,
        status:1,
        user:user,
        date:time,
      })
      props.history.push('/')

      setIsModalVisible(false)
    
}
const onstatus0=()=>{
  const nrSt=0;
   axios.post(`http://localhost:3090/status/${_id}`,{status:nrSt,user:user,date:date});

   dispatch({
      type: "UPDATE_STATUS",
      id:_id,
      status:0,
      user:user,
      date:date

    })
    props.history.push('/')

    setIsModalVisible(false)
  
}
  let buttonText = 'Percakto Statusin'
  if (props.record.status===0) { buttonText='Percakto Statusin'}
  else if(props.record.status===1){buttonText= 'Perfunduar'}
  else{
     buttonText='Paperfunduar'
  }

    return (
        <div  >
        <Button style={props.record.status===1?{ backgroundColor: 'green',width:'100%'}:props.record.status===0?{ backgroundColor: 'white',color:'black',width:'100%'}:{ backgroundColor: 'orange',width:'100%'}} onClick={showModal}>
           <div style={props.record.status===1?{ color: 'white'}:props.record.status===0?{ color:'black'}:{ color: 'white'}}>{buttonText} </div> </Button>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Button onClick={onstatus2}style={{backgroundColor:'orange'}} type="ghost">Paperfunduar</Button>{"    "}
        <Button onClick={onstatus1} style={{backgroundColor:'green'}} type="ghost">Perfunduar</Button>
        <Button onClick={onstatus0}  type="ghost">Paveprim</Button>


      </Modal>
        </div>
    )
}

export default ModalStatus
