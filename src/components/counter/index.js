import React, { useContext, useState } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.contex';
import GoodsComponent from '../goods';

const CounterComponent = () => {
  const { selectedGoods, data, addGoods, removeGoods } = useContext(GoodsContext);
  const [totalCost, setTotalCost] = useState(0);

  const calculatePossibleSums = (items) => {
    let sums = new Map();
    sums.set(0, []);

    for (let item of items) {
      let newSums = new Map();

      for (let [sum, combo] of sums) {
        let newCombo = [...combo, item];
        let newSum = sum + item.cost;

        if (!sums.has(newSum)) {
          newSums.set(newSum, newCombo);
        }
      }

      for (let [newSum, newCombo] of newSums) {
        sums.set(newSum, newCombo);
      }
    }

    return sums;
  };

  const findClosestSum = (sums, targetSum) => {
    let closestSum = 0;

    for (let sum of sums.keys()) {
      if (sum <= targetSum && sum > closestSum) {
        closestSum = sum;
      }
    }

    return closestSum;
  };

  const selectItems = (items, targetSum) => {
    let temp = [...items];
    temp.sort((a, b) => a.cost - b.cost);
    let sums = calculatePossibleSums(temp);
    let closestSum = findClosestSum(sums, targetSum);
    return sums.get(closestSum);
  };

  const autoDetect = () => {
    let selectedItems = selectItems(data, 40);

    if (selectedGoods.length !== 0) {
      selectedGoods.forEach((item) => removeGoods(item));
    }

    setTotalCost(selectedItems.reduce((acc, cur) => acc + cur.cost, 0));

    selectedItems.forEach((item) => addGoods(item));
  };

  return (
    <div className='cost-wrapper'>
      <div>{totalCost}/40</div>
      <div className='auto-detect' onClick={autoDetect}>
        auto-detect
      </div>
      <div className='selected-goods'>
        {selectedGoods.map((el) => (
          <GoodsComponent {...el} key={'selected' + el.id} />
        ))}
      </div>
    </div>
  );
};

export default CounterComponent;