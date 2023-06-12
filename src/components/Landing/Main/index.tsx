import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './main.css';

const Main = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section className='Landing-container' style={{ maxBlockSize: 'none' }}>
      <div className='container'>
        <div className='row rounded-rectangle-section' id='play-section'>
          <div className='col my-auto text-center'>
            <a href='/play' target='_blank'>
              <img
                src={
                  isHovered
                    ? require('../../../assets/img-landing/play_logo_hover.png')
                    : require('../../../assets/img-landing/play_logo.png')
                }
                alt='Image Play'
                className='img-play'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </a>
          </div>
        </div>
        <div className='row rounded-rectangle-section' id='about-section'>
          <div className='col my-auto text-center'>
            <img
              src={require('../../../assets/img-landing/about.png')}
              alt='About'
              className='img-about'
            />
            <p className='text'>
              &emsp;Industrial Craft is a cutting-edge NFT project that boasts a
              meticulously crafted economic model. Our team of experts conducted
              extensive research on the most popular models in the industry,
              carefully selecting the best elements from each to create a truly
              unique and engaging experience.
            </p>
            <p className='text'>
              &emsp;With Industrial Craft, players are able to jump right into
              their adventure with just one item as they gather various
              resources and craft tools, upgrading them as they progress. The
              more items you collect, the greater the rewards and loot
              you&apos;ll unlock.
            </p>
            <p className='text'>
              &emsp;Join the Industrial Craft community today and make your mark
              on this exciting new frontier of gaming and digital art.
            </p>
          </div>
        </div>
        <div className='row rounded-rectangle-section' id='overview-section'>
          <Carousel interval={9000} indicators={true}>
            <Carousel.Item>
              <div className='row'>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/pickaxe_common.png')}
                    alt='Pickaxe Common'
                    className='img-fluid'
                  />
                  <p className='text'>Common Pickaxe</p>
                </div>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/drill_common.png')}
                    alt='Drill Common'
                    className='img-fluid'
                  />
                  <p className='text'>Common Drill</p>
                </div>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/mine_machine_common.png')}
                    alt='Mine Machine Common'
                    className='img-fluid'
                  />
                  <p className='text'>Common Mine Machine</p>
                </div>
              </div>
              <div className='row'>
                <div className='col my-auto text-center'>
                  <div>
                    <p className='text'>
                      &emsp;When it comes to selecting a pickaxe, it&apos;s
                      important to consider the rarity level that is right for
                      you. Generally speaking, the rarer the pickaxe, the
                      greater the potential for profit. However, it&apos;s
                      important to keep in mind that these pickaxes are designed
                      specifically for extracting stone. So while they may offer
                      greater rewards, they may not be the best choice for other
                      types of mining. Ultimately, the choice is yours. Consider
                      your needs, budget and personal preferences and choose the
                      pickaxe that best suits you.
                    </p>
                  </div>
                </div>
                <div className='col my-auto text-center'>
                  <img
                    className='d-block carousel-img'
                    src={require('../../../assets/game/stone.png')}
                    alt='Stone'
                  />
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='row'>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/pickaxe_rare.png')}
                    alt='Pickaxe Rare'
                    className='img-fluid'
                  />
                  <p className='text'>Rare Pickaxe</p>
                </div>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/drill_rare.png')}
                    alt='Drill Rare'
                    className='img-fluid'
                  />
                  <p className='text'>Rare Drill</p>
                </div>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/mine_machine_rare.png')}
                    alt='Mine Machine Rare'
                    className='img-fluid'
                  />
                  <p className='text'>Rare Mine Machine</p>
                </div>
              </div>
              <div className='row'>
                <div className='col my-auto text-center'>
                  <div>
                    <p className='text'>
                      &emsp;Selecting the right drill for your mining adventure
                      is of utmost importance. Remember, the rarer the drill,
                      the more valuable the iron you extract! But don&apos;t be
                      fooled, these specialized drills might not be suitable for
                      other types of mining. It&apos;s all up to you, hero. Take
                      into account your budget, personal style, and mining
                      objectives, and choose the drill that will lead you to
                      glorious iron riches!
                    </p>
                  </div>
                </div>
                <div className='col my-auto text-center'>
                  <img
                    className='d-block carousel-img'
                    src={require('../../../assets/game/iron.png')}
                    alt='Iron'
                  />
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='row'>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/pickaxe_legendary.png')}
                    alt='Pickaxe Legendary'
                    className='img-fluid'
                  />
                  <p className='text'>Legendary Pickaxe</p>
                </div>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/drill_legendary.png')}
                    alt='Drill Legendary'
                    className='img-fluid'
                  />
                  <p className='text'>Legendary Drill</p>
                </div>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/mine_machine_legendary.png')}
                    alt='Mine Machine Legendary'
                    className='img-fluid'
                  />
                  <p className='text'>Legendary Mine Machine</p>
                </div>
              </div>
              <div className='row'>
                <div className='col my-auto text-center'>
                  <div>
                    <p className='text'>
                      &emsp;Picking the perfect mine machine for your quest to
                      uncover gold is a crucial decision. Keep in mind, the more
                      unique the mine machine, the greater the rewards of gold
                      you can uncover! But beware, these specialized machines
                      are specifically designed for gold extraction, so they may
                      not be ideal for other types of mining operations. The
                      choice is yours, adventurer. Consider your resources,
                      individual flair, and ultimate goal, and select the mine
                      machine that will guide you to a treasure trove of golden
                      riches!
                    </p>
                  </div>
                </div>
                <div className='col my-auto text-center'>
                  <img
                    className='d-block carousel-img'
                    src={require('../../../assets/game/gold.png')}
                    alt='Gold'
                  />
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='row'>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/pickaxe_industrial.png')}
                    alt='Pickaxe Industrial'
                    className='img-fluid'
                  />
                  <p className='text'>Industrial Pickaxe</p>
                </div>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/drill_industrial.png')}
                    alt='Drill Industrial'
                    className='img-fluid'
                  />
                  <p className='text'>Industrial Drill</p>
                </div>
                <div className='col rarity-col'>
                  <img
                    src={require('../../../assets/game/mine_machine_industrial.png')}
                    alt='Mine Machine Industrial'
                    className='img-fluid'
                  />
                  <p className='text'>Industrial Mine Machine</p>
                </div>
              </div>
              <div className='row'>
                <div className='col my-auto text-center'>
                  <div>
                    <p className='text'>
                      &emsp;As a gold rush miner, it&apos;s time to hear about
                      the industrial tools. These are the best of the best,
                      crafted by the finest artisans in the world. With these
                      tools in hand, success is inevitable. The pickaxe, known
                      for its ability to mine the toughest stones with ease. The
                      drill, perfect for extracting iron from the depths of the
                      earth. And the mine machine, the ultimate tool for
                      uncovering veins of glittering gold. Each tool is designed
                      for its specific purpose, providing you with the power to
                      unearth riches beyond your wildest dreams. So gear up,
                      gold rush miner, it&apos;s time to strike it rich!
                    </p>
                  </div>
                </div>
                <div className='col my-auto text-center'>
                  <img
                    className='d-block carousel-img'
                    src={require('../../../assets/game/ores.png')}
                    alt='Gold'
                  />
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className='row rounded-rectangle-section' id='roadmap-section'>
          <div className='col my-auto text-center'>
            <img
              src={require('../../../assets/img-landing/roadmap.png')}
              alt='Mine Machine Industrial'
              className='img-fluid'
            />
          </div>
        </div>
        <div className='row rounded-rectangle-section' id='whitepaper-section'>
          <div className='col my-auto text-center'>
            <a
              href='https://whitepaper.industrialcraft.io/industrial-craft/welcome-in-industrial-craft/what-is-industrial-craft'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src={require('../../../assets/img-landing/whitepaper.png')}
                alt='Whitepaper'
                className='img-whitepaper'
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
