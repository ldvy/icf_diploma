import { AppThunk } from '../store';
import {
  setUserData,
  setIsNewUser,
  setIsLoading,
  setIsNewMessage,
} from './userSlice';

import { WalletEnum } from '../../types';
import AnchorLink from 'anchor-link';
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport';
import * as waxjs from '@waxio/waxjs/dist';

import { data } from '../../data';
import { getAuthData } from '../../components/Play/helpers';
import { sendTransaction } from '../../api/transact.api';
import { CheckersApi } from '../../api/checkers.api';

export const loginThunk =
  (type: WalletEnum, selectedChain: any): AppThunk =>
  async (dispatch, getState) => {
    try {
      const userData = getState().user.userData;
      const transport = new AnchorLinkBrowserTransport();

      const newUserData = {
        loginType: userData.loginType,
        accountName: userData.accountName,
        anchorSession: userData.anchorSession,
        waxSession: userData.waxSession,
        selectedNodeURL: userData.selectedNodeURL,
      };
      newUserData.loginType = type;
      newUserData.selectedNodeURL = selectedChain.nodeUrl;

      dispatch(setIsLoading({ isLoading: true }));
      if (type === 'wax') {
        newUserData.waxSession = new waxjs.WaxJS({
          rpcEndpoint: selectedChain.nodeUrl,
        });
        newUserData.waxSession.login('industrialcraft').then((data: any) => {
          dispatch(setUserData({ ...newUserData, accountName: data }));
          dispatch(checkIfUserIsRegisteredThunk());
          dispatch(setIsLoading({ isLoading: false }));
        });
      } else {
        const anchorLink = new AnchorLink({
          transport,
          chains: [
            {
              chainId: selectedChain.chainId,
              nodeUrl: selectedChain.nodeUrl,
            },
          ],
        });
        anchorLink.login('industrialcraft').then((identity) => {
          const { session } = identity;
          newUserData.anchorSession = session;
          const accountName = session.auth.toString().split('@')[0];
          newUserData.accountName = accountName;
          dispatch(setUserData(newUserData));
          dispatch(checkIfUserIsRegisteredThunk());
          dispatch(setIsLoading({ isLoading: false }));
        });
      }
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to login. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const checkIfUserIsRegisteredThunk =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const userData = getState().user.userData;
      const isUserExist = await CheckersApi.checkUserExists(
        userData.selectedNodeURL,
        userData.accountName
      );

      if (isUserExist) {
        dispatch(setIsNewUser({ isNewUser: false }));
      }
    } catch (error) {
      const errorMessage = `'Unable to check if user is registered. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };

export const registrationThunk = (): AppThunk => async (dispatch, getState) => {
  try {
    const isNewUser = getState().user.isNewUser;
    const userData = getState().user.userData;

    const action = {
      account: data.game_account,
      name: 'regnewuser',
      authorization: [getAuthData(userData)],
      data: {
        user: userData.accountName,
      },
    };

    if (isNewUser) {
      dispatch(setIsLoading({ isLoading: true }));
      sendTransaction(userData, action)
        .then(() => {
          dispatch(checkIfUserIsRegisteredThunk());
          dispatch(setIsLoading({ isLoading: false }));
        })
        .catch((error: any) => {
          dispatch(setIsLoading({ isLoading: false }));
        });
    }
  } catch (error) {
    dispatch(setIsLoading({ isLoading: false }));
    const errorMessage = `'Unable to register. ${error}. Please reload the page`;
    dispatch(
      setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
    );
  }
};
