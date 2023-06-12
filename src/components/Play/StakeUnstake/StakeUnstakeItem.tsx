import React, { FC } from 'react';
import './stakeunstake.css';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { updateToolIsSelectedThunk } from '../../../redux/user/inventoryThunk';

import { InventoryItemType } from '../../../types';

type StakeUnstakeItemPropsType = {
  item: InventoryItemType;
  isStakedList: boolean;
};

const StakeUnstakeItem: FC<StakeUnstakeItemPropsType> = ({
  item,
  isStakedList,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      className={`item-socket item-socket-${item.is_selected ? 'active' : ''}`}
      onClick={() => dispatch(updateToolIsSelectedThunk(item, isStakedList))}
      style={{
        backgroundImage: `url(${require(`../../../assets/game/${item.image_name}`)})`,
      }}
    ></div>
  );
};

export default StakeUnstakeItem;
