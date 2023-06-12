import React, { useEffect } from 'react';
import { Container, Tab, Row, Nav } from 'react-bootstrap';
import './main-play.css';

import { RootState } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import {
  updateStakedToolsThunk,
  updateUnStakedToolsThunk,
} from '../../../redux/user/inventoryThunk';
import { updateTemplatesThunk } from '../../../redux/user/templateThunk';
import { updatePutToMineToolsThunk } from '../../../redux/user/mineThunk';

import Mine from '../Mine';
import StakeUnstake from '../StakeUnstake';
import Inventory from '../Inventory';
import Craft from '../Craft';

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();

  const accountName = useSelector(
    (state: RootState) => state.user.userData.accountName
  );
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(updateTemplatesThunk());
      await dispatch(updateStakedToolsThunk());
      await dispatch(updateUnStakedToolsThunk());
      await dispatch(updatePutToMineToolsThunk());
    };
    fetchData();
  }, [accountName]);

  return (
    <Container className='bg-play-main'>
      <Tab.Container id='top-tab-example' defaultActiveKey='mine'>
        <Row className='bg-section-menu'>
          <div className='content-section-menu'>
            <Nav variant='pills' className='mt-0 d-flex justify-content-center'>
              <Nav.Item>
                <Nav.Link eventKey='stake'>Stake</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='inventory'>Inventory</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='mine'>Mine</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='craft'>Craft</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='bonuses'>Bonuses</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Row>
        <Row style={{ height: '97%', marginTop: '-2%' }}>
          <Tab.Content className='mt-5'>
            <Tab.Pane eventKey='stake' className='container-for-component'>
              <StakeUnstake />
            </Tab.Pane>
            <Tab.Pane eventKey='inventory' className='container-for-component'>
              <Inventory />
            </Tab.Pane>
            <Tab.Pane eventKey='mine' className='container-for-component'>
              <Mine />
            </Tab.Pane>
            <Tab.Pane eventKey='craft' className='container-for-component'>
              <Craft />
            </Tab.Pane>
            <Tab.Pane eventKey='bonuses' className='container-for-component'>
              <p
                style={{
                  color: 'white',
                  textShadow: '1px 1px 1px #000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  fontSize: '36px',
                }}
              >
                Coming soon...
              </p>
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Main;
