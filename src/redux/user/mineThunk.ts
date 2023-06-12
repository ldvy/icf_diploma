import { AppThunk } from '../store';
import { setMineTables, setIsLoading, setIsNewMessage } from './userSlice';
import { MineApi } from '../../api/mine.api';

import { data } from '../../data';
import { InventoryItemType, MineTableType } from '../../types';
import { getAuthData } from '../../components/Play/helpers';
import { sendTransaction } from '../../api/transact.api';

import { updateStakedToolsThunk } from './inventoryThunk';
import { updateGameBalanceThunk } from './balanceThunk';

export const updatePutToMineToolsThunk =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      dispatch(updateStakedToolsThunk());
      dispatch(setIsLoading({ isLoading: true }));
      const userData = getState().user.userData;
      const putToMineTools = await MineApi.getPutToMineTools(
        userData.selectedNodeURL,
        userData.accountName
      );

      const newMineTables: Array<MineTableType> = [
        {
          id: 0,
          allowed_template_ids: data.mine_table_pickaxe,
          item: null,
          set_for_mine_time: null,
        },
        {
          id: 1,
          allowed_template_ids: data.mine_table_pickaxe,
          item: null,
          set_for_mine_time: null,
        },
        {
          id: 2,
          allowed_template_ids: data.mine_table_drill,
          item: null,
          set_for_mine_time: null,
        },
        {
          id: 3,
          allowed_template_ids: data.mine_table_drill,
          item: null,
          set_for_mine_time: null,
        },
        {
          id: 4,
          allowed_template_ids: data.mine_table_mine_machine,
          item: null,
          set_for_mine_time: null,
        },
        {
          id: 5,
          allowed_template_ids: data.mine_table_mine_machine,
          item: null,
          set_for_mine_time: null,
        },
      ];

      for (const item of putToMineTools) {
        const inventoryTool =
          getState().user.stakedList.find(
            (tool) => tool.asset_id === item.assets_id
          ) || null;
        if (inventoryTool === null) break;

        switch (item.type) {
          case 1:
            for (let i = 0; i < data.tables_per_type; i++) {
              if (newMineTables[i].item === null) {
                newMineTables[i].item = inventoryTool;
                newMineTables[i].set_for_mine_time = item.time;
                break;
              }
            }
            break;
          case 2:
            for (let i = 0; i < data.tables_per_type; i++) {
              if (newMineTables[2 + i].item === null) {
                if (newMineTables[2 + i].item === null) {
                  newMineTables[2 + i].item = inventoryTool;
                  newMineTables[2 + i].set_for_mine_time = item.time;
                  break;
                }
              }
            }
            break;
          case 3:
            for (let i = 0; i < data.tables_per_type; i++) {
              if (newMineTables[4 + i].item === null) {
                if (newMineTables[4 + i].item === null) {
                  newMineTables[4 + i].item = inventoryTool;
                  newMineTables[4 + i].set_for_mine_time = item.time;
                  break;
                }
              }
            }
            break;
        }
      }
      dispatch(setMineTables({ mine_tables: newMineTables }));
      dispatch(setIsLoading({ isLoading: false }));
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to update put to mine tools list. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const setToolToMineThunk =
  (tool: InventoryItemType): AppThunk =>
  async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      if (!tool) throw 'No tool was provided';
      const userData = getState().user.userData;
      const accountName = getState().user.userData.accountName;

      const action = {
        account: data.game_account,
        name: data.set_tool_to_mine_action_name,
        authorization: [getAuthData(userData)],
        data: {
          user: accountName,
          assets_id: tool.asset_id,
        },
      };

      dispatch(setIsLoading({ isLoading: true }));
      sendTransaction(userData, action)
        .then(() => {
          dispatch(updatePutToMineToolsThunk());
          dispatch(setIsLoading({ isLoading: false }));
        })
        .catch((error: any) => {
          dispatch(setIsLoading({ isLoading: false }));
        });
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to put tool to mine. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const unsetToolFromMineThunk =
  (tool: InventoryItemType): AppThunk =>
  async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      if (!tool) throw 'No tool was provided';
      const userData = getState().user.userData;
      const accountName = getState().user.userData.accountName;

      const action = {
        account: data.game_account,
        name: data.unset_tool_to_mine_action_name,
        authorization: [getAuthData(userData)],
        data: {
          user: accountName,
          assets_id: tool.asset_id,
        },
      };

      dispatch(setIsLoading({ isLoading: true }));
      sendTransaction(userData, action)
        .then(() => {
          dispatch(updatePutToMineToolsThunk());
          dispatch(updateGameBalanceThunk());
          dispatch(setIsLoading({ isLoading: false }));
        })
        .catch((error: any) => {
          dispatch(setIsLoading({ isLoading: false }));
        });
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to unset tool from mining. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };
