import { Form, Input, Button,message } from 'antd';
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleSubmit = async (value) => {
      try{
        dispatch({type:'SHOW_LOADING'});
        await axios.post('/api/users/register',value);
        message.success('add Item successfully!');
        navigate('/login');
        dispatch({type:'HIDE_LOADING'});
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
            <h3>Register Page</h3>
            <Form 
            layout='vertical' 
            onFinish={handleSubmit}>
          <Form.Item name='name' label='name'>
            <Input/>
          </Form.Item>
          <Form.Item name='userId' label='User ID'>
            <Input/>
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input type='password'/>
          </Form.Item>
          
          <div className="d-flex justify-content-between">
            <p>
                Already Register Please
                <Link to="/login">Login Here</Link>
            </p>
            <Button type="primary" htmlType="submit">REGISTER</Button>
          </div>
        </Form>
        </div>
    </div>
    </>
    )
}

export default Register;