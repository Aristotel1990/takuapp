import React,{useState} from 'react'
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { useStateValue } from "./StateProvider";
import axios from 'axios';
function FalseStatus(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [{ user}, dispatch] = useStateValue();
    const {_id}=props.record;
  
  const showModal = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onstatus2=()=>{
    const nrSt=2;
       axios.post(`https:/agjente.herokuapp.com/status/${_id}`,{status:nrSt,user:user});
       dispatch({
          type: "UPDATE_STATUS",
          id:_id,
          status:2,
          user:user,

        })
        setIsModalVisible(false);
      
  }
  const onstatus1=()=>{
    const nrSt=1;
    axios.post(`https:/agjente.herokuapp.com/status/${_id}`,{status:nrSt,user:user});
    console.log(user)
     dispatch({
        type: "UPDATE_STATUS",
        id:_id,
        status:1,
        user:user,
      })
      setIsModalVisible(false)
    
}
const onstatus0=()=>{
  const nrSt=0;
   axios.post(`https:/agjente.herokuapp.com/status/${_id}`,{status:nrSt,user:user});
   dispatch({
      type: "UPDATE_STATUS",
      id:_id,
      status:0,
      user:user,

    })
    setIsModalVisible(false)
  
}
    return (
        <div  >
        <Button style={props.record.status===1?{ backgroundColor: 'green'}:props.record.status===0?{ backgroundColor: 'white'}:{ backgroundColor: 'orange'}} onClick={showModal}>
             Percakto Statusin</Button>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Button onClick={onstatus2}style={{backgroundColor:'orange'}} type="ghost">Paperfunduar</Button>{"    "}
        <Button onClick={onstatus1} style={{backgroundColor:'green'}} type="ghost">Perfunduar</Button>
        <Button onClick={onstatus0} type="ghost">Paveprim</Button>


      </Modal>
        </div>
    )
}

export default FalseStatus
