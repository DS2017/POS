import React, {useEffect, useState} from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from 'axios';
import {DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { Table,Button,Modal, Form ,Select,message,Input} from 'antd';


const ItemPage = () => {

  const dispatch = useDispatch();
  const [itemData, setItemData] = useState([]);
  const [popupModal,setPopupMoal] = useState(false);
  const [editItem,setEditItem] = useState(null);

  //useEffect
  useEffect(()=>{    
    getAllItems();
  },[]);

  // handleDelete 
  const handleDelete = async (record) =>{
    try{
      dispatch({type:'SHOW_LOADING'});
      await axios.post('/api/items/delete-item',{itemId:record._id});
      message.success('delete Item successfully!');
      getAllItems();
      setPopupMoal(false);
      dispatch({type:'HIDE_LOADING'});
    }
    catch (err){
      message.error('somthing went wrong');
      console.log(err)
    }
  }


  const columns = [
    {title:'Name', dataIndex:'name'},
    {title:'Image',dataIndex:'image',
    render:(image,record) => <img src={image} alt={record.name} height='60' width='60' /> },
    {title:'Price', dataIndex:'price'},
    {title:'Action', dataIndex:'_id', render:(id,record) => 
    <div>
        <EditOutlined style={{cursor:'pointer'}} onClick={() => {
          setEditItem(record);
          setPopupMoal(true);
        }
        }/>
        <DeleteOutlined style={{cursor:'pointer'}} onClick={() =>{
          handleDelete(record)
        } 
      }/>
        
    </div>}
];

//get Items
const getAllItems = async () =>{
  try{
    dispatch({type:'SHOW_LOADING'});
    const data = await axios.get('/api/items/get-item');
    setItemData(data.data);
    dispatch({type:'HIDE_LOADING'});
  }
  catch (err){    
    console.log(err)
  }
};

// handle form submit
const handleSubmit = async (value) => {
  if(editItem === null){
    try{
      dispatch({type:'SHOW_LOADING'});
      const res = await axios.post('/api/items/add-item',value);
      message.success('add Item successfully!');
      getAllItems();
      setPopupMoal(false);
      dispatch({type:'HIDE_LOADING'});
    }
    catch (err){
      message.error('somthing went wrong');
      console.log(err)
    }
  }
  else {
    try{
      dispatch({type:'SHOW_LOADING'});
      await axios.put('/api/items/edit-item',{...value, itemId:editItem._id});
      message.success('update Item successfully!');
      getAllItems();
      setPopupMoal(false);
      dispatch({type:'HIDE_LOADING'});
    }
    catch (err){
      message.error('somthing went wrong');
      console.log(err)
    }
  }
}

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setPopupMoal(true)}>ADD Item</Button>
      </div>
      <Table columns={columns} dataSource={itemData} bordered/>

      {popupModal &&
        <Modal title={`${editItem !== null ? "Edit Items" : "Add new Items"}`} 
        visible={popupModal} 
        onCancel={() =>{
          setEditItem(null)
          setPopupMoal(false)        
        }
      } 
        footer={false}
        >

        <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
          <Form.Item name='name' label='name'>
            <Input/>
          </Form.Item>
          <Form.Item name='price' label='price'>
            <Input/>
          </Form.Item>
          <Form.Item name='image' label='image URL'>
            <Input/>
          </Form.Item>
          <Form.Item name='category' label='Category'>
          <Select>
            <Select.Option value='drinks'>Drinks</Select.Option>
            <Select.Option value='rice'>Rice</Select.Option>
            <Select.Option value='noodles'>Noodles</Select.Option>
          </Select>
          </Form.Item>
          
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">SAVE</Button>
          </div>
        </Form>
      </Modal>
      }

      
    </DefaultLayout>
  );
};

export default ItemPage;
