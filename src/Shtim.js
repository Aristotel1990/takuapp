import React, { useState } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { useStateValue } from "./StateProvider";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from'moment';
import { useEffect } from 'react';
import './shtim.css';
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      text: '${label} is not a valid email!',
    
    },
    
  };
function Shtim({history}) {
  const [time, settime] = useState(null)
    const [{ user,errore }, dispatch] = useStateValue();
     const status = 0;


    const onFinish =async (values) => {
      const  StartDate = moment(values.date).format('YYYY-MM-DD')  
    const data = {...values,user:user,id:uuidv4(),date:StartDate}
    console.log(data)
      try {
      const response =await axios.post(`https://taku-app.herokuapp.com/data`,data);
      console.log(response.data)
       dispatch({
          type: "ADD_TO_BASKET",
          item: {
            _id:response.data._id,
            id:response.data.id,
            emri: response.data.emri,
            subjekti: response.data.subjekti,
            nr: response.data.nr,
            qyteti: response.data.qyteti,
            komenti: response.data.komenti,
            status:response.data.status,
            user:user,
            date:response.data.date,
          },
          payload:"U rregjistrua",
        })
     } catch (e) {
        dispatch({type:'AUTH_ERROR',payload:'Nr i celualrit ekziston njehere'})
     }
      };
      useEffect(() => {
         
        
        dispatch({
          type:'AUTH_ERROR',payload:null
        })
         }, [])
      
    return (
        <div className="container-fluid" >
         
              <Form  {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={'emri'}
        label="Emri"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'subjekti'}
        label="Subjekti"
        rules={[
            {
              required: true,
            },
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'nr'}
        label="Nr.cel"
        rules={[
            {
              required: true,
            },
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={'qyteti'} label="Qyteti">
        <Input />
      </Form.Item>
      <Form.Item name={'komenti'} label="Komenti">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={ 'status'}  initialValue={0}>
      </Form.Item>
      <Form.Item name={ 'date'} label="Data" initialValue={''}>
      <DatePicker   />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
          Submit
      </Button>
      </Form.Item>
    </Form>
    <h6 className="error">{errore?errore:""}</h6>
           
             
        </div>
    )
}

export default Shtim
