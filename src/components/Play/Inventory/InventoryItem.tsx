import React, { FC } from 'react';
import './inventory.css';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { repairToolThunk } from '../../../redux/user/inventoryThunk';

import { InventoryItemType, TemplateType } from '../../../types';

type InventoryItemPropsType = {
  item: InventoryItemType;
  itemTemplate?: TemplateType;
};

const InventoryItem: FC<InventoryItemPropsType> = ({ item, itemTemplate }) => {
  const dispatch = useDispatch<AppDispatch>();

  const toolInMineTable = useSelector((state: RootState) =>
    state.user.mineTables.filter(
      (table) => table.item?.asset_id === item.asset_id
    )
  );

  const isEnabled = !(
    item.uses === itemTemplate?.uses ||
    toolInMineTable.length !== 0 ||
    item.is_tool_stuck
  );

  const filterStyle =
    toolInMineTable.length !== 0 ||
    (item.is_tool_stuck &&
      item.tool_unstuck_time !== null &&
      item.tool_unstuck_time !== undefined)
      ? { filter: 'sepia(100%)' }
      : // ? { border: '4px solid rgb(255, 51, 0)' }
        {};
  return (
    <section className='inventory-item'>
      <div
        className='inventory-item-socket'
        style={{
          ...filterStyle,
          backgroundImage: `url(${require(`../../../assets/game/${item.image_name}`)})`,
        }}
      ></div>
      <div className='inventory-item-durability-text'>
        Uses {item.uses} / {itemTemplate?.uses}
      </div>
      <div className='inventory-item-repair-cost-text'>
        Cost: {itemTemplate?.ics_repair.stone} Stone,{' '}
        {itemTemplate?.ici_repair.iron} Iron, {itemTemplate?.icg_repair.gold}{' '}
        Gold
      </div>
      {toolInMineTable.length !== 0 ? (
        <div className='inventory-item-mining-info-text'>
          Tool mining. Wait for completion.
        </div>
      ) : (
        <div className='inventory-item-mining-info-text'>
          {/* The tool is not currently mining. */}
        </div>
      )}
      {item.is_tool_stuck &&
      item.tool_unstuck_time !== null &&
      item.tool_unstuck_time !== undefined ? (
        <div className='inventory-item-stuck-info-text'>
          <span>Tool stuck. Unstuck at </span>
          <span>
            {new Date(
              item.tool_unstuck_time - new Date().getTimezoneOffset() * 60000
            ).toLocaleString()}
            .
          </span>
        </div>
      ) : (
        <div className='inventory-item-stuck-info-text'>
          {/* The tool is not in stuck  */}
        </div>
      )}
      <img
        className='repair-button'
        src={
          isEnabled
            ? require('../../../assets/img-landing/repair-button.png')
            : require('../../../assets/img-landing/disabled-repair-button.png')
        }
        alt='Repair'
        style={{
          borderRadius: '15px',
          cursor: isEnabled ? 'pointer' : 'default',
          opacity: isEnabled ? 1 : 0.5,
        }}
        onClick={() => isEnabled && dispatch(repairToolThunk(item))}
      />
    </section>
  );
};

export default InventoryItem;
