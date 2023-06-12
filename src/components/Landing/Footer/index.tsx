import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  Discord,
  Twitter,
  EnvelopeFill,
  HouseFill,
} from 'react-bootstrap-icons';
import './footer.css';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section style={{ marginTop: '5vh' }} className='footer-container'>
      <div className='d-flex flex-column align-items-center'>
        <div className='d-flex'>
          <a
            href='https://discord.gg/rXB6Tj4jUd'
            target='_blank'
            rel='noreferrer'
          >
            <Discord width={24} height={24} color={'White'} />
          </a>
          <a
            href='https://twitter.com/industrial_ct'
            target='_blank'
            rel='noreferrer'
          >
            <Twitter width={24} height={24} color={'White'} />
          </a>
          <a
            href='mailto:ic@industrialcraft.io'
            target='_blank'
            rel='noreferrer'
          >
            <EnvelopeFill width={24} height={24} color={'White'} />
          </a>
          <a
            href='https://wax.atomichub.io/explorer/collection/wax-mainnet/industrialct'
            target='_blank'
            rel='noreferrer'
          >
            <HouseFill width={24} height={24} color={'White'} />
          </a>
        </div>
        <div>©Industrial Craft All rights reserved</div>
        <div>
          <a
            className='link-style'
            style={{ cursor: 'pointer' }}
            onClick={() => setShowModal(true)}
          >
            Legals
          </a>
        </div>
        <Modal
          size='lg'
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Rights</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Name: WAX INDUSTRIAL CRAFT<br></br>
              <br></br>
              Founder: Franchuk Vitalii<br></br>
              <br></br>
              Company ID: 45105351<br></br>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
};

export default Footer;
