import { useState } from 'react';
import * as uuid from 'uuid';
import GoodsComponent from './goods';
import CounterComp from './counter';
import './style.css';
import GoodsMock from './goodsMock.json';
import GoodsContext from '../context/goods.context';
import CampComponent from './camp';

const goods = GoodsMock.map(el => ({
 ...el,
 id: uuid.v1()
}));

const AppComponent = () => {
    const [data, setData] = useState(goods);
    const [selectedGoods, setSelectedGoods] = useState([]);

 const addGoods = (item) => {
  setSelectedGoods((prevSelectedGoods) => {
   return [...prevSelectedGoods, item];
  });
 };

 const removeGoods = (item) => {
  setSelectedGoods((prevSelectedGoods) => {
   return prevSelectedGoods.filter(el => {
    return item.id !== el.id;
   });
  });
 };

 const removeAllGoods = () => {
    let newData = [];
    let selectedLen = selectedGoods.length;
    let dataLen = data.length;
    let sum = 0;
    for (let i = 0; i < dataLen; ++i) {
        let found = false;
        for (let j = 0; j < selectedLen; ++j) {
            if (data[i].id == selectedGoods[j].id) { 
                sum += data[i].cost;
                found = true; 
                break; 
            }
        }
        if (!found) { newData.push(data[i]); }
    }
    if (sum >= 40) { 
        setData(newData); 
        setSelectedGoods([]);
    }
 };

 return (
  <div className='app'>
   <div className='wrapper'>
    <GoodsContext.Provider value={{
     selectedGoods: selectedGoods,
     addGoods,
     removeGoods,
     removeAllGoods,
     data
    }}>
     <CounterComp />
     <div className='goods-wrapper'>
      {
       data.map(el => {
        // return <GoodsComponent cost={el.cost} imageSrc={el.imageSrc} title={el.title} />;
        return <GoodsComponent {...el} key={el.id} />;
       })
      }
     </div>
     {/* <GoodsComponent cost={20} title='title' imageSrc='./images/goods-1.webp' /> */}
     <CampComponent />
    </GoodsContext.Provider>
   </div>
  </div>
 );
};

export default AppComponent;;