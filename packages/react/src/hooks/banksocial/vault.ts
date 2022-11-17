import { Abi, Narrow } from 'abitype'
import { BigNumber } from 'ethers'

import { daoVaultAddress as _daoVaultAddress, daoVaultABI } from '../..'
import { useContractWrite, usePrepareContractWrite } from '../contracts'

export interface ContractReturn {
  data: import('@wagmi/core').SendTransactionResult | undefined
  status: ReturnType<typeof useContractWrite>['status']
  writeError: Error | null
  write: ReturnType<typeof useContractWrite>['write']
}

export type StakeArgs = {
  amount: number
  daoVaultAddress?: `0x${string}`
  abi?: Narrow<Abi | readonly []>
}

export type UnstakeArgs = {
  tokenId: number
  daoVaultAddress?: `0x${string}`
  abi?: Narrow<Abi | readonly []>
}

/**
 * @example
 *
 * const { write: _stake } = useStake({ amount: 1 })
 */
export const useStake = ({
  amount,
  daoVaultAddress = _daoVaultAddress,
  abi = daoVaultABI,
}: StakeArgs) => {
  // USDC has 6 decimals
  const amountFormatUSDC = amount * 10 ** 6

  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoVaultAddress,
    abi,
    functionName: 'stake',
    args: [BigNumber.from(amountFormatUSDC)],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

/**
 * @example
 *
 * const { write: _unstake } = useUnstake({ tokenId: 0 }) // Change tokenId to yours
 */
export const useUnstake = ({
  tokenId,
  daoVaultAddress = _daoVaultAddress,
  abi = daoVaultABI,
}: UnstakeArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoVaultAddress,
    abi,
    functionName: 'unstakeFull',
    args: [BigNumber.from(tokenId)],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}
