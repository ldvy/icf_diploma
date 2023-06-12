import { AppThunk } from '../store';
import {
  setStakedList,
  setUnStakedList,
  changeToolIsSelected,
  setIsLoading,
  setIsNewMessage,
} from './userSlice';

import { InventoryApi } from '../../api/inventory.api';
import { StuckApi } from '../../api/stuck.api';

import {
  InventoryItemType,
  IncomingStakedInventoryItemType,
} from '../../types';
import { getAuthData } from '../../components/Play/helpers';
import { data } from '../../data';
import { sendTransaction } from '../../api/transact.api';
import { updateGameBalanceThunk } from './balanceThunk';

export const updateStakedToolsThunk =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      const selectedNodeURL = getState().user.userData.selectedNodeURL;
      const accountName = getState().user.userData.accountName;

      dispatch(setIsLoading({ isLoading: true }));
      const stakedToolsList = await InventoryApi.getStakedTools(
        selectedNodeURL,
        accountName
      );
      const stuckToolsList = await StuckApi.getStuckTools(
        selectedNodeURL,
        accountName
      );

      const newStakedList: Array<IncomingStakedInventoryItemType> =
        stakedToolsList;

      for (const tool of newStakedList) {
        const stuckTableItem = stuckToolsList.filter(
          (stuckTool) => tool.asset_id === stuckTool.asset_id
        )[0];

        const timeNow = new Date();
        const utcTimeNow = new Date(
          timeNow.getTime() + timeNow.getTimezoneOffset() * 60000
        );
        const unStuckToolTime = new Date(
          new Date(stuckTableItem.time).getTime() +
            stuckTableItem.time_hours * 3600000
        );

        // const unStuckToolTime = new Date(
        //   new Date(stuckTableItem.time).getTime() +
        //     stuckTableItem.time_minutes * 60000
        // );

        if (utcTimeNow.getTime() < unStuckToolTime.getTime()) {
          tool.is_tool_stuck = true;
          tool.tool_unstuck_time = unStuckToolTime.getTime();
        } else {
          tool.is_tool_stuck = false;
          tool.tool_unstuck_time = null;
        }
      }
      dispatch(setStakedList(newStakedList));
      dispatch(setIsLoading({ isLoading: false }));
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to update staked tools list. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const updateUnStakedToolsThunk =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      const selectedNodeURL = getState().user.userData.selectedNodeURL;
      const accountName = getState().user.userData.accountName;

      dispatch(setIsLoading({ isLoading: true }));
      const unStakedToolsList = await InventoryApi.getUnStakedTools(
        selectedNodeURL,
        accountName
      );
      dispatch(setUnStakedList(unStakedToolsList));
      dispatch(setIsLoading({ isLoading: false }));
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to update unstaked tools list. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const stakeToolsThunk =
  (toolList: Array<InventoryItemType>): AppThunk =>
  async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      if (!toolList) throw 'No tools were selected';
      const userData = getState().user.userData;

      const action = {
        account: 'atomicassets',
        name: 'transfer',
        authorization: [getAuthData(userData)],
        data: {
          from: userData.accountName,
          to: data.game_account,
          asset_ids: toolList.map((item) => item.asset_id),
          memo: 'stake',
        },
      };

      dispatch(setIsLoading({ isLoading: true }));
      sendTransaction(userData, action)
        .then(() => {
          dispatch(updateStakedToolsThunk());
          dispatch(updateUnStakedToolsThunk());
          dispatch(setIsLoading({ isLoading: false }));
        })
        .catch((error: any) => {
          dispatch(setIsLoading({ isLoading: false }));
        });
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to stake the selected tools. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const unStakeToolsThunk =
  (toolList: Array<InventoryItemType>): AppThunk =>
  async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      if (!toolList) throw 'No tools were selected';
      const userData = getState().user.userData;

      const action = {
        account: data.game_account,
        name: data.withdraw_tool_action_name,
        authorization: [getAuthData(userData)],
        data: {
          user: userData.accountName,
          assets_id: toolList.map((item) => item.asset_id),
        },
      };

      dispatch(setIsLoading({ isLoading: true }));
      sendTransaction(userData, action)
        .then(() => {
          dispatch(updateStakedToolsThunk());
          dispatch(updateUnStakedToolsThunk());
          dispatch(setIsLoading({ isLoading: false }));
        })
        .catch((error: any) => {
          dispatch(setIsLoading({ isLoading: false }));
        });
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to unstake the selected tools. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const updateToolIsSelectedThunk =
  (item: InventoryItemType, isStakedList: boolean): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(changeToolIsSelected({ item, isStakedList }));
    } catch (error) {
      const errorMessage = `Unable to update tool isSelected. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const repairToolThunk =
  (tool: InventoryItemType): AppThunk =>
  async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      const userData = getState().user.userData;
      const gameBalance = getState().user.gameBalance;
      const toolTemplate = getState().user.templates.find(
        (template) => template.template_id === tool.template_id
      );

      if (
        gameBalance.stone < toolTemplate!.ics_repair.stone ||
        gameBalance.iron < toolTemplate!.ici_repair.iron ||
        gameBalance.gold < toolTemplate!.icg_repair.gold
      ) {
        throw 'Game balance is not enough to repair the tool';
      }

      const action = {
        account: data.game_account,
        name: data.full_repair_tool_action_name,
        authorization: [getAuthData(userData)],
        data: {
          user: userData.accountName,
          asset_id: tool.asset_id,
        },
      };

      dispatch(setIsLoading({ isLoading: true }));
      sendTransaction(userData, action)
        .then(() => {
          dispatch(updateStakedToolsThunk());
          dispatch(updateGameBalanceThunk());
          dispatch(setIsLoading({ isLoading: false }));
        })
        .catch((error: any) => {
          dispatch(setIsLoading({ isLoading: false }));
        });
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to repair the selected tool. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };
