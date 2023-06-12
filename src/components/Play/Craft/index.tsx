import React, { useEffect } from 'react';
import './craft.css';

import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

import CraftItem from './CraftItem';

const Craft = () => {
  const templates = useSelector((state: RootState) => state.user.templates);

  return (
    <section className='craft-background'>
      <div className='craft-items-container'>
        {templates.map((template) => (
          <CraftItem key={template.template_id} itemTemplate={template} />
        ))}
      </div>
    </section>
  );
};

export default Craft;
