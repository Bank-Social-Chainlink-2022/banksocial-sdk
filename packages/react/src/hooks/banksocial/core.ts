import { Abi, Narrow } from 'abitype'
import { BigNumber } from 'ethers'

import {
  aaveATokenAddress as _aaveAToken,
  poolAddress as _poolAddress,
  socialBankABI as _socialBankABI,
  socialBankAddress as _socialBankAddress,
  swapAddress as _swapAddress,
  usdcAddress as _usdcAddress,
} from '../..'
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from '../contracts'

export interface ContractReturn {
  data: import('@wagmi/core').SendTransactionResult | undefined
  status: ReturnType<typeof useContractWrite>['status']
  writeError: Error | null
  write: ReturnType<typeof useContractWrite>['write']
}

export type DaosByAddressArgs = {
  daoId: number
  socialBankAddress?: `0x${string}`
  abi?: Narrow<Abi | readonly []>
}

export type CreateDaoArgs = {
  name: string
  initBaseURI: string
  maxSupply: number
  minStake: number
  socialBankAddress?: `0x${string}`
  usdcAddress?: `0x${string}`
  aaveAToken?: `0x${string}`
  poolAddress?: `0x${string}`
  swapAddress?: `0x${string}`
  abi?: Narrow<Abi | readonly []>
}
/*******************************************************
 * Read Contract
/********************************************************/

export const useVaultAddress = ({
  daoId,
  socialBankAddress = _socialBankAddress,
  abi = _socialBankABI,
}: DaosByAddressArgs): ReturnType<typeof useContractRead> => {
  return useContractRead({
    address: socialBankAddress,
    abi,
    functionName: 'getVaultById',
    args: [BigNumber.from(daoId)],
  })
}

export const useDAOAddress = ({
  daoId,
  socialBankAddress = _socialBankAddress,
  abi = _socialBankABI,
}: DaosByAddressArgs): ReturnType<typeof useContractRead> => {
  return useContractRead({
    address: socialBankAddress,
    abi,
    functionName: 'getDAOById',
    args: [BigNumber.from(daoId)],
  })
}

export const useDaosById = ({
  daoId,
  socialBankAddress = _socialBankAddress,
  abi = _socialBankABI,
}: DaosByAddressArgs): ReturnType<typeof useContractRead> => {
  return useContractRead({
    address: socialBankAddress,
    abi,
    functionName: 'getDAOsById',
    args: [BigNumber.from(daoId)],
  })
}

/*******************************************************
 * Write Contract
/********************************************************/

/**
 * @example
 *
 *  const { write: _createDAO } = useCreateDAO({
 *   initBaseURI: 'test',
 *   maxSupply: 10,
 *   minStake: 1,
 *   name: 'test',
 *   socialBankAddress: socialBankAddress,
 *   usdcAddress: usdcAddress,
 *   aaveAToken: aaveAToken,
 *   poolAddress: poolAddress,
 *   swapAddress: swapAddress,
 * })
 */
export const useCreateDAO = ({
  name = 'test',
  initBaseURI = 'test',
  maxSupply = 10,
  minStake = 1,
  socialBankAddress = _socialBankAddress,
  usdcAddress = _usdcAddress,
  aaveAToken = _aaveAToken,
  poolAddress = _poolAddress,
  swapAddress = _swapAddress,
  abi = _socialBankABI,
}: CreateDaoArgs) => {
  const maxSupplyFormatUSDC = maxSupply * 10 ** 6
  const minStakeFormatUSDC = minStake * 10 ** 6

  const { config, error: prepareError } = usePrepareContractWrite({
    address: socialBankAddress,
    abi,
    functionName: 'createDAO',
    args: [
      name,
      initBaseURI,
      usdcAddress,
      aaveAToken,
      poolAddress,
      swapAddress,
      BigNumber.from(maxSupplyFormatUSDC),
      BigNumber.from(minStakeFormatUSDC),
    ],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}
