import { UserDataType } from '../../types';

export const shuffle = (
  array: Array<{ chainId?: string; nodeUrl: string }>
) => {
  return array.sort(() => Math.random() - 0.5);
};

export const chainsData = shuffle([
  {
    nodeUrl: 'https://wax.greymass.com/',
    chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
  },
  {
    nodeUrl: 'https://waxtestnet.greymass.com/',
    chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
  },
  {
    nodeUrl: 'https://wax.pink.gg/',
    chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
  },
  {
    nodeUrl: 'https://wax.cryptolions.io/',
    chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
  },
  {
    nodeUrl: 'https://wax.eu.eosamsterdam.net/',
    chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
  },
]);

export const getAuthData = (userData: UserDataType) => {
  if (userData.loginType === 'wax') {
    return {
      actor: userData.waxSession.userAccount,
      permission: 'active',
    };
  } else {
    return userData.anchorSession.auth;
  }
};
