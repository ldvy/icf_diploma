import { UserDataType, WalletEnum } from '../types';

export const sendTransaction = (userData: UserDataType, action: any) => {
  if (userData.loginType === WalletEnum.anchor) {
    const actionToUse = action?.length ? action : [action];
    return userData.anchorSession.transact({ actions: actionToUse });
  } else {
    const actionToUse = action?.length ? action : [action];
    return userData.waxSession.api.transact(
      { actions: actionToUse },
      {
        blocksBehind: 3,
        expireSeconds: 1200,
      }
    );
  }
};
