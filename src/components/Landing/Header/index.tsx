import { write } from 'fs';
import React, { useState } from 'react';
import './header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = (event.currentTarget as HTMLAnchorElement).getAttribute(
      'href'
    );
    if (!targetId) {
      return;
    }

    if (targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

  return (
    <section className='header-container sticky-top'>
      <nav className='navbar navbar-expand-lg navbar-dark'>
        <a
          className='navbar-brand'
          href='#play-section'
          onClick={scrollToSection}
        >
          <div className='text-header'> Industrial Craft </div>
        </a>
        <button className='navbar-toggler' onClick={() => setIsOpen(!isOpen)}>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className={`navbar-collapse ${isOpen ? 'show' : 'collapse'}`}>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#about-section'
                onClick={scrollToSection}
              >
                <div className='text-header'> About </div>
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#overview-section'
                onClick={scrollToSection}
              >
                <div className='text-header'> Overview </div>
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#roadmap-section'
                onClick={scrollToSection}
              >
                <div className='text-header'> Roadmap </div>
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#whitepaper-section'
                onClick={scrollToSection}
              >
                <div className='text-header'> Whitepaper </div>
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#play-section'
                onClick={scrollToSection}
              >
                <div className='text-header'> Play </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Header;
