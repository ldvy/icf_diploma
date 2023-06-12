import React, { useState } from 'react';
import './itemchoose.css';

import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setToolToMineThunk } from '../../../redux/user/mineThunk';

import { InventoryItemType } from '../../../types';

import { Modal as ModalBS } from 'react-bootstrap';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  table_id: number;
};

const ModalItemChoose: React.FC<Props> = ({ show, setShow, table_id }) => {
  const [selectedSocket, setSelectedSocket] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const stakedList = useSelector((state: RootState) => state.user.stakedList);
  const alreadyMiningTools = useSelector((state: RootState) =>
    state.user.mineTables.map((tool) => tool.item?.asset_id)
  );
  const allowedTemplates = useSelector(
    (state: RootState) => state.user.mineTables
  ).find((table) => table.id === table_id)?.allowed_template_ids;

  const availableTools: Array<InventoryItemType> | [] =
    stakedList.filter(
      (tool) =>
        allowedTemplates?.includes(tool.template_id) &&
        !alreadyMiningTools.includes(tool.asset_id) &&
        tool.uses !== 0 &&
        !tool.is_tool_stuck
    ) || [];

  const socketElements = [];
  for (let i = 0; i < availableTools.length; i++) {
    const isSelected = i === selectedSocket;
    socketElements.push(
      <div
        key={i}
        className={`choose-item-socket ${isSelected ? 'selected' : ''}`}
        onClick={() => {
          if (isSelected) {
            setSelectedSocket(null);
          } else {
            setSelectedSocket(i);
          }
        }}
        style={{
          backgroundImage: `url(${require(`../../../assets/game/${availableTools[i].image_name}`)})`,
        }}
      ></div>
    );
  }

  const putItemToWork = () => {
    if (selectedSocket !== null) {
      dispatch(setToolToMineThunk(availableTools[selectedSocket]));
      setShow(false);
      setSelectedSocket(null);
    }
  };

  return (
    <section className='itemchoose-modal'>
      <ModalBS
        show={show}
        onHide={() => setShow(false)}
        centered
        className='itemchoose-modal'
      >
        <div className='itemchoose-bg'>
          <div className='content-itemchoose'>
            <div className='choose-container'>{socketElements}</div>
            <img
              src={require('../../../assets/img-landing/select-button.png')}
              alt='Submit'
              className='img-select'
              onClick={putItemToWork}
              style={{
                cursor: selectedSocket !== null ? 'pointer' : 'default',
              }}
            />
          </div>
        </div>
      </ModalBS>
    </section>
  );
};

export default ModalItemChoose;
