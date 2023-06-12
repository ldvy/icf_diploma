import { JsonRpc } from 'eosjs';
import { data } from '../data';

export const TemplateApi = {
  getItems: async (selectedNodeURL: string) => {
    const rpc = new JsonRpc(selectedNodeURL);
    const templates = (
      await rpc.get_table_rows({
        code: data.game_account,
        table: data.templates_table,
        scope: data.game_account,
        json: true,
        limit: 12,
        reverse: false,
        show_payer: false,
      })
    ).rows;
    return templates;
  },
};
