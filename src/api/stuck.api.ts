import { JsonRpc } from 'eosjs';
import { data } from '../data';

export const StuckApi = {
  getStuckTools: async (selectedNodeURL: string, accountName: string) => {
    const rpc = new JsonRpc(selectedNodeURL);
    const stuckTools = (
      await rpc.get_table_rows({
        code: data.game_account,
        table: data.stuck_tools_table,
        scope: data.game_account,
        json: true,
        limit: data.staked_unstaked_tools_output_limit,
        reverse: false,
        show_payer: false,
      })
    ).rows.filter((tool) => tool.account === accountName);
    return stuckTools;
  },
};
