export { createClient } from './client'
export type { Client, CreateClientConfig } from './client'

export { Context, WagmiConfig, useClient } from './context'
export type { WagmiConfigProps } from './context'

/** Bank Social Start */
export { useBankSocialActivity } from './hooks/banksocial/activities'
export { useCreateDAO, useDaosById } from './hooks/banksocial/core'
export { useStake, useUnstake, useHarvest } from './hooks/banksocial/vault'
export { useUSDCApprove } from './hooks/banksocial/usdc'
export { useMemberMint } from './hooks/banksocial/member'
export { usePropose, useVote } from './hooks/banksocial/dao'

export {
  socialBankABI,
  daoABI,
  daoVaultABI,
  memberCardABI,
  usdcABI,
} from './utils/constants/abis'
export {
  socialBankAddress,
  daoAddress,
  daoVaultAddress,
  memberCardAddress,
  mumbaiDaoAdr,
  mumbaiDaoVaultAdr,
  mumbaiMemberCardAdr,
  mumbaiSocialBankAdr,
  aaveATokenAddress as aaveAToken,
  poolAddress,
  uniswapAddress,
  usdcAddress,
} from './utils/constants/addresses'
/** Bank Social End */

export {
  paginatedIndexesConfig,
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useContract,
  useContractEvent,
  useContractInfiniteReads,
  useContractRead,
  useContractReads,
  useContractWrite,
  useDisconnect,
  useEnsAddress,
  useEnsAvatar,
  useEnsName,
  useEnsResolver,
  useFeeData,
  useInfiniteQuery,
  useMutation,
  useNetwork,
  useProvider,
  useQuery,
  useQueryClient,
  useSendTransaction,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSignMessage,
  useSignTypedData,
  useSigner,
  useSwitchNetwork,
  useToken,
  useTransaction,
  useWaitForTransaction,
  useWebSocketProvider,
} from './hooks'

export { deserialize, serialize } from './utils'

export {
  AddChainError,
  ChainDoesNotSupportMulticallError,
  ChainMismatchError,
  ChainNotConfiguredError,
  Connector,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  ContractMethodDoesNotExistError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
  ProviderChainsNotFound,
  ProviderRpcError,
  ResourceUnavailableError,
  RpcError,
  SwitchChainError,
  SwitchChainNotSupportedError,
  UserRejectedRequestError,
  alchemyRpcUrls,
  allChains,
  chain,
  chainId,
  configureChains,
  createStorage,
  deepEqual,
  defaultChains,
  defaultL2Chains,
  erc20ABI,
  erc721ABI,
  erc4626ABI,
  etherscanBlockExplorers,
  infuraRpcUrls,
  publicRpcUrls,
  readContracts,
} from '@wagmi/core'
export type {
  Chain,
  ChainProviderFn,
  ConnectorData,
  ConnectorEvents,
  Storage,
  Unit,
} from '@wagmi/core'

export type { Address } from 'abitype'
