import React,{useState} from 'react'
import 'antd/dist/antd.css';
import { useStateValue } from "./StateProvider";
import { Form, Input, Button, Checkbox } from 'antd';
import './shtim.css';
import axios from 'axios';
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
function SignUp({history}){
    const [sate, dispatch] = useStateValue();
   
     const onFinish =async (values,callback) =>{
       
        try{
          const response = await axios.post('https://taku-app.herokuapp.com/signup',values);
         dispatch({type:"AUTH_USER",token:response.data.token})
         localStorage.setItem('token',response.data.token)
         localStorage.setItem('user',response.data.user.username)

         callback();
         }catch(e){
         dispatch({type:"AUTH_ERROR",payload:'Useri ekziston'})
         }
         history.push('/feature')
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
      return (
        <div className="container-fluid" >
        <div className="row mh-100vh">
          <div className="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch bg-white p-5 rounded rounded-lg-0 my-5 my-lg-0" id="login-block">
            <div className="m-auto w-lg-75 w-xl-50">
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
            </div>
          </div>
             
        </div>
        
      );
}

export default SignUp
