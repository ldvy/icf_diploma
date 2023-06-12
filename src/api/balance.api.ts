import { JsonRpc } from 'eosjs';
import { data } from '../data';

export const BalanceApi = {
  fetchUserBalance: async (selectedNodeURL: string, accountName: string) => {
    const rpc = new JsonRpc(selectedNodeURL);
    return await rpc.get_table_rows({
      code: data.token_account,
      table: data.token_balance_table,
      scope: accountName,
      json: true,
      limit: 3,
      reverse: false,
      show_payer: false,
    });
  },
  fetchGameBalance: async (selectedNodeURL: string, accountName: string) => {
    const rpc = new JsonRpc(selectedNodeURL);
    return await rpc.get_table_rows({
      code: data.game_account,
      table: data.game_balance_table,
      scope: data.game_account,
      json: true,
      lower_bound: accountName,
      upper_bound: accountName,
      limit: 10,
      reverse: false,
      show_payer: false,
      index_position: 'primary',
      key_type: 'name',
    });
  },
};
