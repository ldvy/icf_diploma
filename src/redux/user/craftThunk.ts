import { AppThunk } from '../store';

import { data } from '../../data';
import { TemplateType } from '../../types';
import { getAuthData } from '../../components/Play/helpers';
import { sendTransaction } from '../../api/transact.api';

import { updateUnStakedToolsThunk } from './inventoryThunk';
import { updateGameBalanceThunk } from './balanceThunk';

import { setIsLoading, setIsNewMessage } from './userSlice';

export const craftToolThunk =
  (template?: TemplateType): AppThunk =>
  async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().user.isLoggedIn;
      if (!isLoggedIn) throw 'User is not logged in';

      if (!template) throw 'No template was provided';
      const userData = getState().user.userData;
      const accountName = getState().user.userData.accountName;

      const action = {
        account: data.game_account,
        name: data.craft_tool_action_name,
        authorization: [getAuthData(userData)],
        data: {
          schema_name: data.craft_tool_schema_name,
          template_id: template.template_id,
          new_asset_owner: accountName,
        },
      };

      dispatch(setIsLoading({ isLoading: true }));
      sendTransaction(userData, action)
        .then(() => {
          dispatch(updateUnStakedToolsThunk());
          dispatch(updateGameBalanceThunk());
          dispatch(setIsLoading({ isLoading: false }));
        })
        .catch((error: any) => {
          dispatch(setIsLoading({ isLoading: false }));
        });
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage = `Unable to craft the tool. ${error}. Please reload the page`;
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };
