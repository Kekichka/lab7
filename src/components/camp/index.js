import { useContext } from 'react';
import CampIcon from './camp-table.png';
import './style.css';
import GoodsContext from '../../context/goods.contex';

const CampComponent = () => {
 const { removeAllGoods } = useContext(GoodsContext);
 return (
  <div className="camp">
   <img src={CampIcon} onClick={() => removeAllGoods()} />
  </div>
 );
};

export default CampComponent;