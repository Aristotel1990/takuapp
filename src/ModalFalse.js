import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button ,Form, Input} from 'antd';
import { useStateValue } from "./StateProvider";
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
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
    number: '${label} is not a valid number!',
  }
};

function ModalFalse(record) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [{user}, dispatch] = useStateValue();
     
  const showModal = () => {
    setIsModalVisible(true);
  };


    const onFinish = (values) => {
    const pako={...values.user,user:user}  
     axios.post('https:/agjente.herokuapp.com/edit',pako)
      dispatch({
        type:'UPDATE',
        item:pako
      })
      setIsModalVisible(false);
    }        
  
    
 

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    return (
        <>
          <Button type="ghost" >
            Edit
          </Button>
        <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel}>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
            name={['user', 'emri']}
            label="Name"
           initialValue={record.record.emri}
           >
            <Input    />
          </Form.Item>
          <Form.Item
            name={['user', 'subjekti']}
            label="Subjekti"
            initialValue={record.record.subjekti}

          >
            <Input   />
          </Form.Item>
          <Form.Item
            name={['user', 'nr']}
            label="Nr"
            initialValue={record.record.nr}

          >
            <Input  />
          </Form.Item>
          <Form.Item
            name={['user', 'qyteti']}
            label="Qyteti" 
            initialValue={record.record.qyteti}
>
            <Input />
          </Form.Item>
          <Form.Item 
          name={['user', 'komenti']} 
          label="Komenti"
          initialValue={record.record.komenti}

          >
            <Input.TextArea  />
          </Form.Item>
          <FormItem name={['user', '_id']} 
          initialValue={record.record._id}>

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
export default ModalFalse
