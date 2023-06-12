import React, { useState } from 'react';
import './withdraw.css';

import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { withdrawTokenThunk } from '../../../redux/user/balanceThunk';

import { Modal as ModalBS } from 'react-bootstrap';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalWithdraw: React.FC<Props> = ({ show, setShow }) => {
  const options = ['ICS (Stone)', 'ICI (Iron)', 'ICG (Gold)'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedNumber, setSelectedNumber] = useState<string>('');

  const currentStone = useSelector(
    (state: RootState) => state.user.gameBalance.stone
  );
  const currentIron = useSelector(
    (state: RootState) => state.user.gameBalance.iron
  );
  const currentGold = useSelector(
    (state: RootState) => state.user.gameBalance.gold
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
      setSelectedNumber(value);
      return;
    }
    const isValid = /^\d*(\.\d{0,4})?$/.test(value);
    if (isValid) {
      switch (selectedOption.split(' ')[0]) {
        case 'ICS':
          if (parseFloat(value) <= currentStone) setSelectedNumber(value);
          break;
        case 'ICI':
          if (parseFloat(value) <= currentIron) setSelectedNumber(value);
          break;
        case 'ICG':
          if (parseFloat(value) <= currentGold) setSelectedNumber(value);
          break;
      }
      return;
    }
  };

  const handleSubmit = () => {
    dispatch(
      withdrawTokenThunk(
        parseFloat(selectedNumber).toFixed(4),
        selectedOption.split(' ')[0]
      )
    );
    setSelectedNumber('');
  };

  return (
    <ModalBS
      show={show}
      onHide={() => setShow(false)}
      centered
      className='withdraw-modal'
    >
      <div className='withdraw-bg'>
        <div className='content-withdraw'>
          <h1 style={{ marginBottom: '10%' }}> Withdraw </h1>
          <p style={{ fontSize: '120%' }}> Select token for withdraw:</p>
          <select
            value={selectedOption}
            onChange={(event) => {
              setSelectedOption(event.target.value);
              setSelectedNumber('');
            }}
            style={{
              fontSize: '120%',
              marginBottom: '5%',
              backgroundColor: 'rgb(234, 220, 203)',
              border: '2px solid rgb(0, 0, 0)',
            }}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p style={{ fontSize: '120%' }}> Enther the amount:</p>
          <input
            style={{
              backgroundColor: 'rgb(234, 220, 203)',
              border: '2px solid rgb(0, 0, 0)',
            }}
            type='number'
            value={selectedNumber}
            onChange={handleInputChange}
          />
          <img
            src={require('../../../assets/img-landing/dep-button.png')}
            alt='Submit'
            style={{ cursor: 'pointer', marginTop: '10%' }}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </ModalBS>
  );
};

export default ModalWithdraw;
