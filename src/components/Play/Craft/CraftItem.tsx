import React, { FC } from 'react';
import './craft.css';

import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';

import { data } from '../../../data';
import { TemplateType } from '../../../types';

import { craftToolThunk } from '../../../redux/user/craftThunk';

type CraftItemPropsType = {
  itemTemplate?: TemplateType;
};

const CraftItem: FC<CraftItemPropsType> = ({ itemTemplate }) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentStone = useSelector(
    (state: RootState) => state.user.gameBalance.stone
  );
  const currentIron = useSelector(
    (state: RootState) => state.user.gameBalance.iron
  );
  const currentGold = useSelector(
    (state: RootState) => state.user.gameBalance.gold
  );

  const craftCostStone = itemTemplate?.ics_craft.stone || 0;
  const craftCostIron = itemTemplate?.ici_craft.iron || 0;
  const craftCostGold = itemTemplate?.icg_craft.gold || 0;

  const isenoughresforcraft =
    currentStone >= craftCostStone &&
    currentIron >= craftCostIron &&
    currentGold >= craftCostGold;

  return (
    <section className='craft-item-section'>
      <div
        className='craft-item-socket'
        style={{
          backgroundImage: `url(${require(`../../../assets/game/${
            data.template_image_map[itemTemplate?.template_id || 606635]
          }`)})`,
        }}
      ></div>
      <div className='craft-item-cost'>
        Cost: {craftCostStone} Stone, {craftCostIron} Iron, {craftCostGold} Gold
      </div>
      <img
        src={
          isenoughresforcraft
            ? require('../../../assets/img-landing/craft-button.png')
            : require('../../../assets/img-landing/craft-button-disabled.png')
        }
        alt='Craft'
        style={{
          borderRadius: '15px',
          cursor: isenoughresforcraft ? 'pointer' : 'default',
          opacity: isenoughresforcraft ? 1 : 0.5,
        }}
        onClick={() =>
          isenoughresforcraft && dispatch(craftToolThunk(itemTemplate))
        }
      />
    </section>
  );
};

export default CraftItem;
