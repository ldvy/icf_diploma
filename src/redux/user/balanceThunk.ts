import { AppThunk } from '../store';
import {
  setUserBalance,
  setGameBalance,
  setIsLoading,
  setIsNewMessage,
} from './userSlice';
import { BalanceApi } from '../../api/balance.api';
import { getAuthData } from '../../components/Play/helpers';
import { data } from '../../data';
import { sendTransaction } from '../../api/transact.api';

export const updateUserBalanceThunk =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      const accountName = getState().user.userData.accountName;
      const selectedNodeURL = getState().user.userData.selectedNodeURL;

      dispatch(setIsLoading({ isLoading: true }));
      const response = await BalanceApi.fetchUserBalance(
        selectedNodeURL,
        accountName
      );
      if (response.rows.length === 0) {
        return;
      }

      const userBalance = {
        stone: 0,
        iron: 0,
        gold: 0,
      };
      for (const row of response.rows) {
        const value = parseFloat(row.balance.split(' ')[0]);
        const symbol = row.balance.split(' ')[1];
        switch (symbol) {
          case 'ICS':
            userBalance.stone = value;
            break;
          case 'ICI':
            userBalance.iron = value;
            break;
          case 'ICG':
            userBalance.gold = value;
            break;
        }
      }
      dispatch(setUserBalance(userBalance));
      dispatch(setIsLoading({ isLoading: false }));
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to update user balance. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const updateGameBalanceThunk =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const accountName = getState().user.userData.accountName;
      const selectedNodeURL = getState().user.userData.selectedNodeURL;
      const isLoggedIn = getState().user.isLoggedIn;

      if (!isLoggedIn) {
        return null;
      }

      dispatch(setIsLoading({ isLoading: true }));
      const response = await BalanceApi.fetchGameBalance(
        selectedNodeURL,
        accountName
      );

      const userObj =
        response.rows.length === 0
          ? { ics: '0.0000', ici: '0.0000', icg: '0.0000' }
          : response.rows[0];

      dispatch(
        setGameBalance({
          stone: parseFloat(userObj.ics.slice(0, 6)),
          iron: parseFloat(userObj.ici.slice(0, 6)),
          gold: parseFloat(userObj.icg.slice(0, 6)),
        })
      );
      dispatch(setIsLoading({ isLoading: false }));
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to update game balance. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const depositTokenThunk =
  (amount: string, tokenName: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      const userData = getState().user.userData;

      const action = {
        account: data.token_account,
        name: data.deposit_token_action_name,
        authorization: [getAuthData(userData)],
        data: {
          from: userData.accountName,
          to: data.game_account,
          quantity: amount + ' ' + tokenName,
          memo: data.deposit_token_action_memo,
        },
      };

      dispatch(setIsLoading({ isLoading: true }));
      sendTransaction(userData, action)
        .then(() => {
          dispatch(updateUserBalanceThunk());
          dispatch(updateGameBalanceThunk());
          dispatch(setIsLoading({ isLoading: false }));
        })
        .catch((error: any) => {
          dispatch(setIsLoading({ isLoading: false }));
        });
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to deposit token. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const withdrawTokenThunk =
  (amount: string, tokenName: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      const userData = getState().user.userData;

      const action = {
        account: data.game_account,
        name: data.withdraw_token_action_name,
        authorization: [getAuthData(userData)],
        data: {
          user: userData.accountName,
          quantity: amount + ' ' + tokenName,
        },
      };

      dispatch(setIsLoading({ isLoading: true }));
      sendTransaction(userData, action)
        .then(() => {
          dispatch(updateUserBalanceThunk());
          dispatch(updateGameBalanceThunk());
          dispatch(setIsLoading({ isLoading: false }));
        })
        .catch((error: any) => {
          dispatch(setIsLoading({ isLoading: false }));
        });
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to withdraw token. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };
