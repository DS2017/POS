import React, {useState,useEffect} from 'react';
import DefaultLayout from "../components/DefaultLayout";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';

const BillsPage = () => {

  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);

  //useEffect
  useEffect(()=>{    
    getAllBills();
  },[]);

  const columns = [
    {title:'ID', dataIndex:'_id'},
    {title:'Name',dataIndex:'cuntomerName' },
    {title:'Customer Number', dataIndex:'customerNumber'},
    {title:'Sub Total', dataIndex:'subTotal'},
    {title:'Tax', dataIndex:'tax'},
    {title:'Total Amount', dataIndex:'totalAmount'}
];

//get Bills
const getAllBills = async () =>{
  try{
    dispatch({type:'SHOW_LOADING'});
    const data = await axios.get('/api/bills/get-bills');
    setBillsData(data.data);
    dispatch({type:'HIDE_LOADING'});
  }
  catch (err){    
    console.log(err)
  }
};

  return (    
    <DefaultLayout>
       <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered pagination={false}/>
    
    </DefaultLayout>
  );
};

export default BillsPage;
