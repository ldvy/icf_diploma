export enum WalletEnum {
  wax = 'wax',
  anchor = 'anchor',
}

export type UserDataType = {
  loginType: WalletEnum;
  accountName: string;
  anchorSession: any;
  waxSession: any;
  selectedNodeURL: string;
};

export enum BalanceEnum {
  stone = 'stone',
  iron = 'iron',
  gold = 'gold',
}

export type BalanceType = {
  [key in BalanceEnum]: number;
};

export type TemplateType = {
  template_id: number;
  ics_repair: BalanceType;
  ici_repair: BalanceType;
  icg_repair: BalanceType;
  ics_craft: BalanceType;
  ici_craft: BalanceType;
  icg_craft: BalanceType;
  duration: number;
  mine: BalanceType;
  uses: number;
};

export type IncomingTemplateType = {
  template_id: number;
  ics_repair: string;
  ici_repair: string;
  icg_repair: string;
  ics_craft: string;
  ici_craft: string;
  icg_craft: string;
  duration: number;
  mine: string;
  uses: number;
};

export type InventoryItemType = {
  is_selected: boolean;
  asset_id: string;
  image_name: string;
  is_tool_stuck?: boolean;
  tool_unstuck_time?: number | null;
  template_id: number;
  uses?: number;
};

export type IncomingStakedInventoryItemType = {
  account: string;
  asset_id: string;
  availability: number;
  template_id: number;
  uses: number;
  is_tool_stuck: boolean;
  tool_unstuck_time?: number | null;
};

export type IncomingUnStakedInventoryItemType = {
  asset_id: string;
  collection_name: string;
  schema_name: string;
  template_id: number;
  ram_payer: string;
  backend_tokens: any;
  immutable_serialized_data: any;
  mutable_serialized_data: any;
};

export type MineTableType = {
  id: number;
  allowed_template_ids: Array<number>;
  item: InventoryItemType | null;
  set_for_mine_time: string | null;
};
