import React,{useState} from 'react'
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { useStateValue } from "./StateProvider";
import axios from 'axios';
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
       axios.post(`http://localhost:3090/status/${_id}`,{status:nrSt,user:user,date:date});
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
   axios.post(`http://localhost:3090/status/${_id}`,{status:nrSt,user:user,date:time});
    console.log(user)
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

export default ModalStatus
