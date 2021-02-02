import React from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import "./Login.css";
import axios from 'axios';
import { useStateValue } from './StateProvider';
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
function Login({history}) {
  const [sate, dispatch] = useStateValue();

    const onFinish =async (values) =>{

        const response = await axios.post('http://localhost:3090/signin',values);
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('user',response.data.user.username)  
       
        dispatch({type:"AUTH_USER",token:response.data.token,user:response.data.user.username})
     
      
       history.push('/feature')
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
      return (
          <div className="login">
<Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
          </div>
        
      );
    };


export default Login;
