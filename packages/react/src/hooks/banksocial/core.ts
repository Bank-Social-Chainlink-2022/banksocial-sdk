import { BigNumber } from 'ethers'

import {
  aaveATokenAddress as _aaveAToken,
  poolAddress as _poolAddress,
  socialBankAddress as _socialBankAddress,
  swapAddress as _swapAddress,
  usdcAddress as _usdcAddress,
  socialBankABI,
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
}
/*******************************************************
 * 
 * Read Contract
 * 
/********************************************************/

export const useDaosById = ({
  daoId,
  socialBankAddress = _socialBankAddress,
}: DaosByAddressArgs): ReturnType<typeof useContractRead> => {
  return useContractRead({
    address: socialBankAddress,
    abi: socialBankABI,
    functionName: 'getDAOsById',
    args: [BigNumber.from(daoId)],
  })
}

/*******************************************************
 * 
 * Write Contract
 * 
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
}: CreateDaoArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: socialBankAddress,
    abi: socialBankABI,
    functionName: 'createDAO',
    args: [
      name,
      initBaseURI,
      usdcAddress,
      aaveAToken,
      poolAddress,
      swapAddress,
      BigNumber.from(maxSupply),
      BigNumber.from(minStake),
    ],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}
