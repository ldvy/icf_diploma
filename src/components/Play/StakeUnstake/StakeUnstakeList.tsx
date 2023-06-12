import React, { FC } from 'react';
import './stakeunstake.css';

import { InventoryItemType } from '../../../types';
import StakeUnstakeItem from './StakeUnstakeItem';

type StakeUnstakeListPropsType = {
  tools: Array<InventoryItemType>;
  isStakedList: boolean;
};

const StakeUnstakeList: FC<StakeUnstakeListPropsType> = ({
  tools,
  isStakedList,
}) => {
  return (
    <section className='items-container'>
      {/* <div>{isStakedList ? 'Staked Items' : 'Unstaked Items'}</div> */}
      {/* <section className='stakeunstake-items-list'></section> */}
      {tools.map((tool) => (
        <StakeUnstakeItem
          key={tool.asset_id}
          item={tool}
          isStakedList={isStakedList}
        />
      ))}
    </section>
  );
};

export default StakeUnstakeList;
