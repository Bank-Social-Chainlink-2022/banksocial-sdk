import { BigNumber } from 'ethers'

import { usdcAddress as _usdcAddress, usdcABI } from '../..'
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

export type AllowanceUsdcArgs = {
  owner: `0x${string}`
  spender: `0x${string}`
  usdcAddress?: `0x${string}`
}

export type UsdcArgs = {
  spender: string
  amount: number
  usdcAddress?: `0x${string}`
}

/*******************************************************
 * Read Contract
/********************************************************/

export const useUSDCAllowance = ({
  owner,
  spender,
  usdcAddress = _usdcAddress,
}: AllowanceUsdcArgs): ReturnType<typeof useContractRead> => {
  return useContractRead({
    address: usdcAddress,
    abi: usdcABI,
    functionName: 'allowance',
    args: [owner, spender],
  })
}

/*******************************************************
 * Write Contract
/********************************************************/

/**
 * @example
 *
 * const { write: _approveUSDC } = useUSDCApprove({
 *   spender: daoVaultAddress,
 *   amount: 10,
 *   usdcAddress: usdcAddress,
 * })
 */
export const useUSDCApprove = ({
  spender,
  amount,
  usdcAddress = _usdcAddress,
}: UsdcArgs) => {
  const amountFormatUSDC = amount * 10 ** 6

  const { config, error: prepareError } = usePrepareContractWrite({
    address: usdcAddress,
    abi: usdcABI,
    functionName: 'approve',
    args: [`0x${spender.slice(2)}`, BigNumber.from(amountFormatUSDC)],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}
