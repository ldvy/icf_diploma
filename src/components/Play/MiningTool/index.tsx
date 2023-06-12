import React, { FC, useEffect, useState } from 'react';
import './miningtool.css';

import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { unsetToolFromMineThunk } from '../../../redux/user/mineThunk';

import { InventoryItemType } from '../../../types';

type MiningToolPropsType = {
  tool: InventoryItemType;
  toolTableKey: string;
};

const MiningTool: FC<MiningToolPropsType> = ({ tool, toolTableKey }) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const setForMiningTime =
    useSelector((state: RootState) =>
      state.user.mineTables.filter(
        (table) => table.item?.asset_id === tool.asset_id
      )
    )[0]?.set_for_mine_time || new Date().toDateString();
  const miningDuration =
    useSelector((state: RootState) =>
      state.user.templates.filter(
        (template) => template.template_id === tool.template_id
      )
    )[0]?.duration || 10;

  const [utcTimeNow, setUtcTimeNow] = useState(() => {
    const stateTimeNow = new Date();
    return new Date(
      stateTimeNow.getTime() + stateTimeNow.getTimezoneOffset() * 60000
    );
  });
  const [collectRewardAvailableTime, setCollectRewardAvailableTime] = useState(
    new Date(new Date(setForMiningTime).getTime() + miningDuration * 60000)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeNow = new Date();
      setUtcTimeNow(
        new Date(timeNow.getTime() + timeNow.getTimezoneOffset() * 60000)
      );
    }, 50000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (utcTimeNow.getTime() > collectRewardAvailableTime.getTime()) {
      setIsButtonEnabled(true);
    } else setIsButtonEnabled(false);
  }, [toolTableKey, utcTimeNow]);

  return (
    <div className='fill-mine-socket' key={toolTableKey}>
      <div
        className='active-mine-socket'
        style={{
          backgroundImage: `url(${require(`../../../assets/game/${tool.image_name}`)})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}
      ></div>
      {!isButtonEnabled && (
        <div className='text-mine'>{`${Math.ceil(
          (collectRewardAvailableTime.getTime() - utcTimeNow.getTime()) /
            (1000 * 60)
        )} minutes left`}</div>
      )}
      <div
        key={toolTableKey}
        onClick={
          isButtonEnabled
            ? () => {
                dispatch(unsetToolFromMineThunk(tool));
              }
            : undefined
        }
      >
        <img
          key={toolTableKey}
          src={
            isButtonEnabled
              ? require('../../../assets/img-landing/collect-button.png')
              : require('../../../assets/img-landing/collect-button-disabled.png')
          }
          alt='Collect'
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '15px',
            cursor: isButtonEnabled ? 'pointer' : 'default',
            opacity: isButtonEnabled ? 1 : 0.5,
          }}
        />
      </div>
    </div>
  );
};

export default MiningTool;
