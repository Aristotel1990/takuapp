import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button ,Form, Input,DatePicker} from 'antd';
import { useStateValue } from "./StateProvider";
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import moment from 'moment';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    text: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  }
};

function ModalData({record,history}) {
  const {_id,id,emri,subjekti,qyteti,nr,komenti,status}=record;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [{user}, dispatch] = useStateValue();
  const showModal = () => {
    setIsModalVisible(true);
    console.log(record)
  };


    const onFinish = (values) => {
      const time = moment(values.date).format()
    const pako={...values,user:user,date:time} 
    console.log(pako)
    setIsModalVisible(false);
       axios.post(`https://taku-app.herokuapp.com//edit/${_id}`,pako);
       dispatch({
          type: 'UPDATE_DATA',
          itemm: pako,
          payload:null
        })
        history.push('/feature')

      };

  const handleCancel = () => {
    history.push('/feature')

    setIsModalVisible(false);
  };
    return (
        <>
          <Button type="ghost" onClick={showModal}>
            Edit
          </Button>
        <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} onOk={()=> setIsModalVisible(false)}>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
            name={'emri'}
            label="Emri"
           initialValue={emri}
           >
            <Input    />
          </Form.Item>
          <Form.Item
            name={'subjekti'}
            label="Subjekti"
            initialValue={subjekti}

          >
            <Input   />
          </Form.Item>
          <Form.Item
            name={ 'nr'}
            label="Nr"
            initialValue={nr}

          >
            <Input  />
          </Form.Item>
          <Form.Item
            name={ 'qyteti'}
            label="Qyteti" 
            initialValue={qyteti}
>
            <Input />
          </Form.Item>
          <Form.Item 
          name={'komenti'} 
          label="Komenti"
          initialValue={
            komenti}

          >
            <Input.TextArea  />
          </Form.Item>
          <FormItem name={'id'} 
          initialValue={id}>

          </FormItem>

          <FormItem name={'status'} 
          initialValue={status}>

          </FormItem>
          <FormItem  name={'date'} 
          label="Data"
          { ...layout }
        >
          <DatePicker
          />
          </FormItem>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

        </Form>
          </Modal>
        </>
      );
    };
export default ModalData
