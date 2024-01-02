import { useContext } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.context';
import GoodsComponent from '../goods';


const CounterComponent = () => {
  let { selectedGoods, data, addGoods, removeGoods } = useContext(GoodsContext);
  const sum = selectedGoods.reduce((acc, cur) => {
    return acc + cur.cost;
  }, 0);


  function calculateSums(fruits) {
      let sums = new Map();
      sums.set(0, []);

      for (let fruit of fruits) {
          let newSums = new Map();
          for (let [sum, combo] of sums) {
              let newCombo = [...combo, fruit];
              let newSum = sum + fruit.cost;
              if (!sums.has(newSum)) {
                  newSums.set(newSum, newCombo);
              }
          }
          for (let [newSum, newCombo] of newSums) {
              sums.set(newSum, newCombo);
          }
      }
      return sums;
  }

  function findClosestSum(sums, targetSum) {
      let closestSum = 0;
      for (let sum of sums.keys()) {
          if (sum <= targetSum && sum > closestSum) {
              closestSum = sum;
          }
      }
      return closestSum;
  }

  function selectFruits(fruits, targetSum) { 
      let temp = [...fruits];
      temp.sort((a, b) => a.cost - b.cost);
      let sums = calculateSums(temp);
      let closestSum = findClosestSum(sums, targetSum);
      return sums.get(closestSum);
  }

  function autoDetect() {
      let elements = selectFruits(data, 40);
      let goodsLen = selectedGoods.length;
      if (goodsLen !== 0) { 
          for (let i = 0; i < goodsLen; ++i) {
              removeGoods(selectedGoods[i]);
          }
      }
      selectedGoods = elements;
      for (let i = 0; i < elements.length; ++i) { 
          addGoods(elements[i]);
      }
  }

 return (
  <div className='cost-wrapper'>
   <div>{sum}/40</div>
   <div className='auto-detect' onClick = {autoDetect}>auto-detect</div>
   <div className='selected-goods'>
    {
     selectedGoods
      .map(el => <GoodsComponent {...el} key={'selected' + el.id} />)
    }
   </div>
  </div>
 );
};

export default CounterComponent;