import React, { FC, useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './header.css';

import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import {
  updateUserBalanceThunk,
  updateGameBalanceThunk,
} from '../../../redux/user/balanceThunk';
import { updateTemplatesThunk } from '../../../redux/user/templateThunk';
import {
  updateStakedToolsThunk,
  updateUnStakedToolsThunk,
} from '../../../redux/user/inventoryThunk';
import { updatePutToMineToolsThunk } from '../../../redux/user/mineThunk';

import ModalDeposit from '../Deposit';
import ModalWithdraw from '../Withdraw';

type HeaderPropsType = object;

const Header: FC<HeaderPropsType> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const accountName = useSelector(
    (state: RootState) => state.user.userData.accountName
  );
  useEffect(() => {
    dispatch(updateUserBalanceThunk());
    dispatch(updateGameBalanceThunk());
  }, [accountName]);

  const ICS = useSelector((state: RootState) => state.user.userBalance.stone);
  const ICI = useSelector((state: RootState) => state.user.userBalance.iron);
  const ICG = useSelector((state: RootState) => state.user.userBalance.gold);

  const stone = useSelector((state: RootState) => state.user.gameBalance.stone);
  const iron = useSelector((state: RootState) => state.user.gameBalance.iron);
  const gold = useSelector((state: RootState) => state.user.gameBalance.gold);

  return (
    <section className='play-header-container'>
      <Navbar className='justify-content-center' bg='black' expand='lg'>
        <Navbar.Brand style={{ color: 'white' }}>Wallet:</Navbar.Brand>
        <Navbar.Text style={{ color: 'white', marginRight: '10px' }}>
          {accountName}
        </Navbar.Text>
        <Navbar.Toggle
          aria-controls='responsive-navbar-nav'
          onClick={() => setIsOpen(!isOpen)}
        />
        <Navbar.Collapse id='responsive-navbar-nav' className=''>
          <Nav>
            <Navbar.Text
              style={{ color: 'white', marginLeft: '5px', marginRight: '10px' }}
            >
              ICS: {ICS}
            </Navbar.Text>
            <Navbar.Text
              style={{ color: 'white', marginLeft: '5px', marginRight: '10px' }}
            >
              ICI: {ICI}
            </Navbar.Text>
            <Navbar.Text
              style={{ color: 'white', marginLeft: '5px', marginRight: '20px' }}
            >
              ICG: {ICG}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse
          id='responsive-navbar-nav'
          className='justify-content-end'
        >
          <Nav>
            <Navbar.Text style={{ color: 'white', marginRight: '10px' }}>
              <img
                src={require('../../../assets/game/stone.png')}
                height='25'
                width='25'
                className='d-inline-block align-top'
                alt='stone-img'
                style={{ marginRight: '5px' }}
              />
              Stone: {stone}
            </Navbar.Text>
            <Navbar.Text
              style={{
                color: 'white',
                marginRight: '10px',
                marginLeft: '20px',
              }}
            >
              <img
                src={require('../../../assets/game/iron.png')}
                height='25'
                width='25'
                className='d-inline-block align-top'
                alt='iron-img'
                style={{ marginRight: '5px' }}
              />
              Iron: {iron}
            </Navbar.Text>
            <Navbar.Text
              style={{
                color: 'white',
                marginRight: '10px',
                marginLeft: '20px',
              }}
            >
              <img
                src={require('../../../assets/game/gold.png')}
                height='25'
                width='25'
                className='d-inline-block align-top'
                alt='gold-img'
                style={{ marginRight: '5px' }}
              />
              Gold: {gold}
            </Navbar.Text>

            <NavDropdown
              title='Deposit/Withdraw'
              id='basic-nav-dropdown'
              style={{ marginRight: '20px' }}
            >
              <NavDropdown.Item
                style={{ color: 'black' }}
                onClick={() => setShowDeposit(true)}
              >
                Deposit
              </NavDropdown.Item>
              <ModalDeposit show={showDeposit} setShow={setShowDeposit} />
              <NavDropdown.Item
                style={{ color: 'black' }}
                onClick={() => setShowWithdraw(true)}
              >
                Withdraw
              </NavDropdown.Item>
              <ModalWithdraw show={showWithdraw} setShow={setShowWithdraw} />
              <NavDropdown.Divider />
              <NavDropdown.Item
                style={{ color: 'black' }}
                onClick={() => (
                  dispatch(updateTemplatesThunk()),
                  dispatch(updateGameBalanceThunk()),
                  dispatch(updateStakedToolsThunk()),
                  dispatch(updateUnStakedToolsThunk()),
                  dispatch(updatePutToMineToolsThunk())
                )}
              >
                Refresh
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </section>
  );
};

export default Header;
