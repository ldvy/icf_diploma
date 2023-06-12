import React from 'react';
import './inventory.css';

import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

import InventoryItem from './InventoryItem';

const Inventory = () => {
  const stakedList = useSelector((state: RootState) => state.user.stakedList);
  const templates = useSelector((state: RootState) => state.user.templates);

  return (
    <section className='inventory-background'>
      <div className='inventory-items-container'>
        {stakedList.map((item) => (
          <InventoryItem
            key={item.asset_id}
            item={item}
            itemTemplate={templates.find(
              (template) => template.template_id === item.template_id
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Inventory;
