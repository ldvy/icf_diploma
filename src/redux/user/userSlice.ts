import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  WalletEnum,
  UserDataType,
  BalanceType,
  TemplateType,
  IncomingTemplateType,
  InventoryItemType,
  IncomingStakedInventoryItemType,
  IncomingUnStakedInventoryItemType,
  MineTableType,
} from '../../types/index';
import { data } from '../../data';

export interface UserState {
  isLoggedIn: boolean;
  isNewUser: boolean;
  isLoading: boolean;
  isNewMessage: boolean;
  messageContent: string;
  userData: UserDataType;
  stakedList: Array<InventoryItemType>;
  unStakedList: Array<InventoryItemType>;
  templates: Array<TemplateType>;
  userBalance: BalanceType;
  gameBalance: BalanceType;
  mineTables: Array<MineTableType>;
  membership: {
    isMember: boolean;
  } | null;
  discounts: {
    mineBonus: number;
    breakResist: number;
  };
}

const initialState: UserState = {
  isLoggedIn: false,
  isNewUser: true,
  isLoading: false,
  isNewMessage: false,
  messageContent: '',
  userData: {
    loginType: WalletEnum.wax,
    accountName: '',
    anchorSession: {},
    waxSession: {},
    selectedNodeURL: '',
  },
  stakedList: [],
  unStakedList: [],
  templates: [],
  userBalance: {
    stone: 0,
    iron: 0,
    gold: 0,
  },
  gameBalance: {
    stone: 0,
    iron: 0,
    gold: 0,
  },
  mineTables: [
    {
      id: 0,
      allowed_template_ids: data.mine_table_pickaxe,
      item: null,
      set_for_mine_time: null,
    },
    {
      id: 1,
      allowed_template_ids: data.mine_table_pickaxe,
      item: null,
      set_for_mine_time: null,
    },
    {
      id: 2,
      allowed_template_ids: data.mine_table_drill,
      item: null,
      set_for_mine_time: null,
    },
    {
      id: 3,
      allowed_template_ids: data.mine_table_drill,
      item: null,
      set_for_mine_time: null,
    },
    {
      id: 4,
      allowed_template_ids: data.mine_table_mine_machine,
      item: null,
      set_for_mine_time: null,
    },
    {
      id: 5,
      allowed_template_ids: data.mine_table_mine_machine,
      item: null,
      set_for_mine_time: null,
    },
  ],
  membership: null,
  discounts: {
    mineBonus: 0,
    breakResist: 0,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state: UserState, action: PayloadAction<any>) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    setIsNewUser: (
      state: UserState,
      action: PayloadAction<{
        isNewUser: boolean;
      }>
    ) => {
      state.isNewUser = action.payload.isNewUser;
    },
    setUserBalance: (state: UserState, action: PayloadAction<BalanceType>) => {
      state.userBalance = action.payload;
    },
    setGameBalance: (state: UserState, action: PayloadAction<BalanceType>) => {
      state.gameBalance = action.payload;
    },
    setStakedList: (
      state: UserState,
      action: PayloadAction<Array<IncomingStakedInventoryItemType>>
    ) => {
      const newStakedList: Array<InventoryItemType> = [];
      action.payload.forEach((item) => {
        newStakedList.push({
          is_selected: false,
          asset_id: item.asset_id,
          image_name: data.template_image_map[item.template_id],
          is_tool_stuck: item.is_tool_stuck,
          tool_unstuck_time: item.tool_unstuck_time,
          template_id: item.template_id,
          uses: item.uses,
        });
      });
      state.stakedList = newStakedList;
    },
    setUnStakedList: (
      state: UserState,
      action: PayloadAction<Array<IncomingUnStakedInventoryItemType>>
    ) => {
      const newUnStakedList: Array<InventoryItemType> = [];
      action.payload.forEach((item) => {
        if (
          item.collection_name === data.collection_name &&
          item.schema_name === 'tools'
        ) {
          newUnStakedList.push({
            is_selected: false,
            asset_id: item.asset_id,
            image_name: data.template_image_map[item.template_id],
            template_id: item.template_id,
          });
        }
      });
      state.unStakedList = newUnStakedList;
    },
    setTemplates: (
      state: UserState,
      action: PayloadAction<Array<IncomingTemplateType>>
    ) => {
      const newTemplates: Array<TemplateType> = [];
      action.payload.forEach((item) => {
        newTemplates.push({
          template_id: item.template_id,
          ics_repair: balanceHelper(item.ics_repair),
          ici_repair: balanceHelper(item.ici_repair),
          icg_repair: balanceHelper(item.icg_repair),
          ics_craft: balanceHelper(item.ics_craft),
          ici_craft: balanceHelper(item.ici_craft),
          icg_craft: balanceHelper(item.icg_craft),
          duration: item.duration,
          mine: balanceHelper(item.ics_repair),
          uses: item.uses,
        });
      });
      state.templates = newTemplates;
    },
    changeToolIsSelected: (
      state: UserState,
      action: PayloadAction<{
        item: InventoryItemType;
        isStakedList: boolean;
      }>
    ) => {
      if (action.payload.isStakedList) {
        const toolIndex = state.stakedList.findIndex(
          (i) => i.asset_id === action.payload.item.asset_id
        );
        state.stakedList[toolIndex].is_selected =
          !state.stakedList[toolIndex].is_selected;
      } else {
        const toolIndex = state.unStakedList.findIndex(
          (i) => i.asset_id === action.payload.item.asset_id
        );
        state.unStakedList[toolIndex].is_selected =
          !state.unStakedList[toolIndex].is_selected;
      }
    },
    setMineTables: (
      state: UserState,
      action: PayloadAction<{
        mine_tables: Array<MineTableType> | null;
      }>
    ) => {
      if (action.payload.mine_tables == null)
        throw 'Supplied mine table object is empty.';
      state.mineTables = action.payload.mine_tables;
    },
    changeUserMembership: (
      state: UserState,
      action: PayloadAction<{
        isMember: boolean;
      } | null>
    ) => {
      state.membership = action.payload;
    },
    updateUserDiscounts: (
      state: UserState,
      action: PayloadAction<{
        mineBonus: number;
        breakResist: number;
      }>
    ) => {
      state.discounts = action.payload;
    },
    setIsLoading: (
      state: UserState,
      action: PayloadAction<{
        isLoading: boolean;
      }>
    ) => {
      state.isLoading = action.payload.isLoading;
    },
    setIsNewMessage: (
      state: UserState,
      action: PayloadAction<{
        isNewMessage: boolean;
        messageContent: string;
      }>
    ) => {
      state.isNewMessage = action.payload.isNewMessage;
      state.messageContent = action.payload.messageContent;
    },
  },
});

function balanceHelper(input: string) {
  const cost = parseFloat(input.split(' ')[0]);
  const token = input.split(' ')[1];

  switch (token) {
    case 'ICS':
      return {
        stone: cost,
        iron: 0,
        gold: 0,
      };
    case 'ICI':
      return {
        stone: 0,
        iron: cost,
        gold: 0,
      };
    case 'ICG':
      return {
        stone: 0,
        iron: 0,
        gold: cost,
      };
    default:
      return {
        stone: 0,
        iron: 0,
        gold: 0,
      };
  }
}

export const {
  setUserData,
  setIsNewUser,
  setUserBalance,
  setGameBalance,
  setStakedList,
  setUnStakedList,
  setTemplates,
  changeToolIsSelected,
  setMineTables,
  changeUserMembership,
  updateUserDiscounts,
  setIsLoading,
  setIsNewMessage,
} = userSlice.actions;

export default userSlice.reducer;
