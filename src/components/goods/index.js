import { useContext, useState } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.context';

/**
 * 
 * @param {Object} props 
 * @param {string} props.title 
 * @param {string} props.imageSrc 
 * @param {number} props.cost 
 */
const GoodsComponent = (props) => {
 let contextInfo = useContext(GoodsContext);
 let [isSelected, setIsSelected] = useState(false);

  const onClick = () => {
    let found = false;
    for (let i = 0; i < contextInfo.selectedGoods.length; ++i) {
        if (contextInfo.selectedGoods[i].id === props.id) { found = true; break; }
    }
    if (isSelected) {
        setIsSelected(false);
        contextInfo.removeGoods(props);
    }
    else if (!isSelected && !found) {
        setIsSelected(true);
        contextInfo.addGoods(props);
    }
};

 let classNames = ['goods'];

 if (isSelected) {
  classNames.push('selected');
 }


 let found = false;
 for (let i = 0; i < contextInfo.selectedGoods.length; ++i) {
    if (contextInfo.selectedGoods[i].id == props.id) {
        classNames.push('selected');
        isSelected = true;
        found = true;
        break;
    }
 }
 if (!found) {
    classNames = ['goods'];
    isSelected = false;
 }

 /**
  * classNames => ['goods']
  * classNames => ['goods', 'selected']
  */
 return (
  <div className={classNames.join(' ')} onClick={onClick}>
   <img src={props.imageSrc} title={props.title} />
   <div className='goods-cost'>{props.cost}</div>
  </div>
 );
};

export default GoodsComponent;