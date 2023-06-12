import React, { useEffect } from 'react';
import './stakeunstake.css';

import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import {
  stakeToolsThunk,
  unStakeToolsThunk,
} from '../../../redux/user/inventoryThunk';

import { InventoryItemType } from '../../../types';
import StakeUnstakeList from './StakeUnstakeList';

const StakeUnstake = () => {
  const dispatch = useDispatch<AppDispatch>();

  const alreadyMiningTools = useSelector((state: RootState) =>
    state.user.mineTables.map((table) => table.item?.asset_id || '')
  );
  const templates = useSelector((state: RootState) => state.user.templates);

  const stakedList = useSelector((state: RootState) =>
    state.user.stakedList.filter(
      (tool) =>
        !alreadyMiningTools.includes(tool.asset_id) &&
        tool.uses ===
          templates.filter(
            (template) => tool.template_id === template.template_id
          )[0]?.uses &&
        !tool.is_tool_stuck
    )
  );
  const unStakedList = useSelector(
    (state: RootState) => state.user.unStakedList
  );

  let stakedListSelected: Array<InventoryItemType> = stakedList.filter(
    (i) => i.is_selected === true
  );
  let unStakedListSelected: Array<InventoryItemType> = unStakedList.filter(
    (i) => i.is_selected === true
  );

  useEffect(() => {
    stakedListSelected = stakedList.filter((i) => i.is_selected === true);
  }, [stakedList]);

  useEffect(() => {
    unStakedListSelected = unStakedList.filter((i) => i.is_selected === true);
  }, [unStakedList]);

  return (
    <section className='stakeunstake-background'>
      <div className='row-unstaked-items'>
        <h1 className='text-names-stakeunstake'>Unstaked items</h1>
        <div className='content-itemcontainer'>
          <StakeUnstakeList tools={unStakedList} isStakedList={false} />
        </div>
      </div>
      <div className='row-control-items'>
        <img
          src={require('../../../assets/img-landing/stake-button.png')}
          alt='Stake'
          className='img-stake-button'
          onClick={() => {
            if (unStakedListSelected.length > 0) {
              dispatch(stakeToolsThunk(unStakedListSelected));
            }
          }}
          style={{
            borderRadius: '15px',
            cursor:
              unStakedListSelected && unStakedListSelected.length > 0
                ? 'pointer'
                : 'default',
            marginBottom: '10%',
          }}
        />
        <img
          src={require('../../../assets/img-landing/unstake-button.png')}
          alt='Unstake'
          className='img-unstake-button'
          onClick={() => {
            if (stakedListSelected.length > 0) {
              dispatch(unStakeToolsThunk(stakedListSelected));
            }
          }}
          style={{
            borderRadius: '15px',
            cursor:
              stakedListSelected && stakedListSelected.length > 0
                ? 'pointer'
                : 'default',
            marginBottom: '10%',
          }}
        />
      </div>
      <div className='row-staked-items'>
        <h1 className='text-names-stakeunstake'>Staked items</h1>
        <div className='content-itemcontainer'>
          <StakeUnstakeList tools={stakedList} isStakedList={true} />
        </div>
      </div>
    </section>
  );
};

export default StakeUnstake;
