interface GameData {
  collection_name: string;
  game_account: string;
  token_account: string;
  tables_per_type: number;
  game_balance_table: string;
  token_balance_table: string;
  templates_table: string;
  staked_tools_table: string;
  put_to_mine_tools_table: string;
  stuck_tools_table: string;
  staked_unstaked_tools_output_limit: number;
  withdraw_tool_action_name: string;
  full_repair_tool_action_name: string;
  set_tool_to_mine_action_name: string;
  unset_tool_to_mine_action_name: string;
  deposit_token_action_name: string;
  deposit_token_action_memo: string;
  withdraw_token_action_name: string;
  craft_tool_schema_name: string;
  craft_tool_action_name: string;
  template_image_map: { [key: number]: string };
  mine_table_pickaxe: Array<number>;
  mine_table_drill: Array<number>;
  mine_table_mine_machine: Array<number>;
}

export const data: GameData = {
  collection_name: 'industrialct',
  game_account: 'industrialgm',
  token_account: 'industrialtt',
  tables_per_type: 2,
  game_balance_table: 'accounts',
  token_balance_table: 'accounts',
  templates_table: 'toolconf',
  staked_tools_table: 'tools',
  put_to_mine_tools_table: 'userstate',
  stuck_tools_table: 'stucktools',
  staked_unstaked_tools_output_limit: 1000,
  withdraw_tool_action_name: 'withdrawtool',
  full_repair_tool_action_name: 'fullrepair',
  set_tool_to_mine_action_name: 'farm',
  unset_tool_to_mine_action_name: 'unfarm',
  deposit_token_action_name: 'transfer',
  deposit_token_action_memo: 'deposit',
  withdraw_token_action_name: 'withdraw',
  craft_tool_schema_name: 'tools',
  craft_tool_action_name: 'craft',
  template_image_map: {
    606635: 'pickaxe_common.png',
    606636: 'pickaxe_rare.png',
    606638: 'pickaxe_legendary.png',
    606639: 'pickaxe_industrial.png',
    607305: 'drill_common.png',
    607306: 'drill_rare.png',
    607307: 'drill_legendary.png',
    607308: 'drill_industrial.png',
    607309: 'mine_machine_common.png',
    607310: 'mine_machine_rare.png',
    607311: 'mine_machine_legendary.png',
    607312: 'mine_machine_industrial.png',
  },
  mine_table_pickaxe: [606635, 606636, 606638, 606639],
  mine_table_drill: [607305, 607306, 607307, 607308],
  mine_table_mine_machine: [607309, 607310, 607311, 607312],
};
