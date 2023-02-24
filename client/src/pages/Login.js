import React, {useEffect} from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleSubmit = async (value) =>{
      try{
        dispatch({type:'SHOW_LOADING'});
        const res = await axios.post('/api/users/login',value);
        message.success('User Login successfully!');
        localStorage.setItem("auth", JSON.stringify(res.data));
        console.log('res.data ',res.data)
        dispatch({type:'HIDE_LOADING'});
        navigate('/');
      }
      catch (err){
        message.error('somthing went wrong');
        console.log(err)
      }
    };

    //check currently logged in user
    useEffect(() => {
      if(localStorage.getItem('auth')){
        localStorage.getItem('auth');
        navigate('/');
      }
    },[navigate]);

    return (
    <>
        <div className='register'>
        <div className='register-form'>
            <h1>POS App</h1>
            <h3>Login Page</h3>
            <Form 
            layout='vertical' 
            onFinish={handleSubmit}>
          <Form.Item name='userId' label='User ID'>
            <Input/>
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input type='password'/>
          </Form.Item>
          
          <div className="d-flex justify-content-between">
            <p>
                New User Please
                <Link to="/register">Register Here</Link>
            </p>
            <Button type="primary" htmlType="submit">LOGIN</Button>
          </div>
        </Form>
        </div>
    </div>
    </>
    )
}

export default Login;