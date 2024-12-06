import { Contract } from "starknet";

export const INTERLINK_ADDRESS =
  "0x0357fa39d3e73793f2d8ce9b89a760ec5d096f62fa4474b2693ee2b3bdab4a09";

export const INTERLINK_ABI = [
  {
    name: "InterlinkImpl",
    type: "impl",
    interface_name: "kharon_contracts::interfaces::InterlinkTrait",
  },
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    name: "kharon_contracts::interfaces::InterlinkTrait",
    type: "interface",
    items: [
      {
        name: "initialize",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "whitelist_account",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "blacklist_account",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "deposit",
        type: "function",
        inputs: [
          {
            name: "token",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "withdraw",
        type: "function",
        inputs: [
          {
            name: "token",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "swap",
        type: "function",
        inputs: [
          {
            name: "token1",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token2",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount_token1",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "transfer",
        type: "function",
        inputs: [
          {
            name: "token",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "pause_vault",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "reactivate_vault",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "get_user_balance",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_linked_accounts",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_total_users",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_total_deposits",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_total_withdrawals",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_owner",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_user_vault_balance",
        type: "function",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "(core::starknet::contract_address::ContractAddress, core::integer::u256)",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "check_account_is_whitelisted",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "update_vault_classhash",
        type: "function",
        inputs: [
          {
            name: "new_classhash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    name: "OwnableImpl",
    type: "impl",
    interface_name: "openzeppelin_access::ownable::interface::IOwnable",
  },
  {
    name: "openzeppelin_access::ownable::interface::IOwnable",
    type: "interface",
    items: [
      {
        name: "owner",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "transfer_ownership",
        type: "function",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "renounce_ownership",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "vault_classhash",
        type: "core::starknet::class_hash::ClassHash",
      },
    ],
  },
  {
    kind: "struct",
    name: "kharon_contracts::inter_link::InterLink::AccountWhitelisted",
    type: "event",
    members: [
      {
        kind: "data",
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "kharon_contracts::inter_link::InterLink::AccountBlacklisted",
    type: "event",
    members: [
      {
        kind: "data",
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "kharon_contracts::inter_link::InterLink::VaultPaused",
    type: "event",
    members: [
      {
        kind: "data",
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "paused_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "kharon_contracts::inter_link::InterLink::VaultReactivated",
    type: "event",
    members: [
      {
        kind: "data",
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "reactivated_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "OwnershipTransferred",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      },
      {
        kind: "nested",
        name: "OwnershipTransferStarted",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      },
    ],
  },
  {
    kind: "enum",
    name: "kharon_contracts::inter_link::InterLink::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "AccountWhitelisted",
        type: "kharon_contracts::inter_link::InterLink::AccountWhitelisted",
      },
      {
        kind: "nested",
        name: "AccountBlacklisted",
        type: "kharon_contracts::inter_link::InterLink::AccountBlacklisted",
      },
      {
        kind: "nested",
        name: "VaultPaused",
        type: "kharon_contracts::inter_link::InterLink::VaultPaused",
      },
      {
        kind: "nested",
        name: "VaultReactivated",
        type: "kharon_contracts::inter_link::InterLink::VaultReactivated",
      },
      {
        kind: "flat",
        name: "OwnableEvent",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
      },
    ],
  },
] as const;

export interface InterlinkContract {
  deposit: (params: {
    token: string;
    amount: { low: string; high: string };
  }) => Promise<any>;

  withdraw: (params: {
    token: string;
    receiver: string;
    amount: { low: string; high: string };
  }) => Promise<any>;

  get_user_balance: (params: {
    account: string;
  }) => Promise<{ low: string; high: string }>;

  get_user_vault_balance: (params: {
    user: string;
    token: string;
  }) => Promise<[string, { low: string; high: string }]>;

  check_account_is_whitelisted: (params: {
    account: string;
  }) => Promise<boolean>;
}
