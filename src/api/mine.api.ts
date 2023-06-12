import { JsonRpc } from 'eosjs';
import { data } from '../data';

export const MineApi = {
  getPutToMineTools: async (selectedNodeURL: string, accountName: string) => {
    const rpc = new JsonRpc(selectedNodeURL);
    const putToMineTools = (
      await rpc.get_table_rows({
        code: data.game_account,
        table: data.put_to_mine_tools_table,
        scope: accountName,
        json: true,
        limit: 6,
        reverse: false,
        show_payer: false,
      })
    ).rows;
    return putToMineTools;
  },
};
