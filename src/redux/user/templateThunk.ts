import { AppThunk } from '../store';
import { setTemplates, setIsLoading, setIsNewMessage } from './userSlice';
import { TemplateApi } from '../../api/template.api';

export const updateTemplatesThunk =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const selectedNodeURL = getState().user.userData.selectedNodeURL;
      dispatch(setIsLoading({ isLoading: true }));
      const templates = await TemplateApi.getItems(selectedNodeURL);
      dispatch(setTemplates(templates));
      dispatch(setIsLoading({ isLoading: false }));
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      const errorMessage =
        'Unable to update tool templates. Please reload the page';
      dispatch(
        setIsNewMessage({ isNewMessage: true, messageContent: errorMessage })
      );
    }
  };
