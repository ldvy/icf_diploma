import React, { useEffect, useState } from 'react';
import './mine.css';

import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

import { MineTableType } from '../../../types';

import MiningTool from '../MiningTool';
import ModalItemChoose from '../ItemChoose';

const Mine = () => {
  const [showItemChoosePickaxes, setShowItemChoosePickaxes] = useState(false);
  const [showItemChooseDrills, setShowItemChooseDrills] = useState(false);
  const [showItemChooseMineMachines, setShowItemChooseMineMachines] =
    useState(false);
  const [mineTablesPickaxes, setMineTablesPickaxes] = useState<
    Array<MineTableType>
  >([]);
  const [mineTablesDrills, setMineTablesDrills] = useState<
    Array<MineTableType>
  >([]);
  const [mineTablesMineMachines, setMineTablesMineMachines] = useState<
    Array<MineTableType>
  >([]);

  const miningTables = useSelector((state: RootState) => state.user.mineTables);
  useEffect(() => {
    setMineTablesPickaxes(
      miningTables.filter((table) => [0, 1].includes(table.id))
    );
    setMineTablesDrills(
      miningTables.filter((table) => [2, 3].includes(table.id))
    );
    setMineTablesMineMachines(
      miningTables.filter((table) => [4, 5].includes(table.id))
    );
  }, [miningTables]);

  const handleMouseEnter = (event: any) => {
    event.currentTarget.style.cursor = 'pointer';
    event.currentTarget.style.border = '2px solid black';
  };
  const handleMouseLeave = (event: any) => {
    event.currentTarget.style.cursor = 'default';
    event.currentTarget.style.border = 'none';
  };

  return (
    <div className='mine-background d-flex justify-content-center align-items-center text-center'>
      <div className='row'>
        <h1 className='text-names'>Pickaxes</h1>
        <div className='section-for-row'>
          {mineTablesPickaxes.map((table) => (
            <section className='mine-table' key={table.id}>
              {table.item === null ? (
                <>
                  <div
                    className='mine-socket'
                    onClick={() => setShowItemChoosePickaxes(true)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Table {table.id + 1} */}
                  </div>
                  <ModalItemChoose
                    show={showItemChoosePickaxes}
                    setShow={setShowItemChoosePickaxes}
                    table_id={table.id}
                  />
                </>
              ) : (
                <MiningTool
                  key={table.id.toString() + table.item.asset_id}
                  tool={table.item}
                  toolTableKey={table.id.toString() + table.item.asset_id}
                />
              )}
            </section>
          ))}
        </div>
      </div>
      <div className='row'>
        <h1 className='text-names'>Drills</h1>
        <div className='section-for-row'>
          {mineTablesDrills.map((table) => (
            <section className='mine-table' key={table.id}>
              {table.item === null ? (
                <>
                  <div
                    className='mine-socket'
                    onClick={() => setShowItemChooseDrills(true)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Table {table.id + 1} */}
                  </div>
                  <ModalItemChoose
                    show={showItemChooseDrills}
                    setShow={setShowItemChooseDrills}
                    table_id={table.id}
                  />
                </>
              ) : (
                <MiningTool
                  key={table.id.toString() + table.item.asset_id}
                  tool={table.item}
                  toolTableKey={table.id.toString() + table.item.asset_id}
                />
              )}
            </section>
          ))}
        </div>
      </div>
      <div className='row'>
        <h1 className='text-names'>Mine machines</h1>
        <div className='section-for-row'>
          {mineTablesMineMachines.map((table) => (
            <section className='mine-table' key={table.id}>
              {table.item === null ? (
                <>
                  <div
                    className='mine-socket'
                    onClick={() => setShowItemChooseMineMachines(true)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Table {table.id + 1} */}
                  </div>
                  <ModalItemChoose
                    show={showItemChooseMineMachines}
                    setShow={setShowItemChooseMineMachines}
                    table_id={table.id}
                  />
                </>
              ) : (
                <MiningTool
                  key={table.id.toString() + table.item.asset_id}
                  tool={table.item}
                  toolTableKey={table.id.toString() + table.item.asset_id}
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mine;
