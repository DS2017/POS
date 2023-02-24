import React, {useState, useEffect} from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemList from "../components/ItemList";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const [itemData, setItemData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('drinks');
  const categories = [
    {
    name:'drinks'
  },
  {
    name:'rice'
  },
  {
    name:'noodles'
  }
]

  const dispatch = useDispatch();

  //useEffect
  useEffect(()=>{
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
    getAllItems();
  },[dispatch])

  return (
    
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div key={category.name} className={`d-flex category 
          ${selectedCategory === category.name && 'active'}`}
          onClick={() => setSelectedCategory(category.name)}>
            <h4>{category.name}</h4>
          </div>
        ))}
      </div>
      <Row>
        {itemData
        .filter((i) => i.category === selectedCategory)
        .map(item => {
          return(
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item}/>
            </Col>
          )
        })
        }
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
