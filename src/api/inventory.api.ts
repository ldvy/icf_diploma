import { JsonRpc } from 'eosjs';
import { data } from '../data';

export const InventoryApi = {
  getStakedTools: async (selectedNodeURL: string, accountName: string) => {
    const rpc = new JsonRpc(selectedNodeURL);
    const stakedTools = (
      await rpc.get_table_rows({
        code: data.game_account,
        table: data.staked_tools_table,
        scope: accountName,
        json: true,
        limit: data.staked_unstaked_tools_output_limit,
        reverse: false,
        show_payer: false,
      })
    ).rows;
    return stakedTools;
  },

  getUnStakedTools: async (selectedNodeURL: string, accountName: string) => {
    const rpc = new JsonRpc(selectedNodeURL);
    const unStakedTools = (
      await rpc.get_table_rows({
        code: 'atomicassets',
        table: 'assets',
        scope: accountName,
        json: true,
        limit: data.staked_unstaked_tools_output_limit,
        reverse: false,
        show_payer: false,
      })
    ).rows;
    return unStakedTools;
  },
};
