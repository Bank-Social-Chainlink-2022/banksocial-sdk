import { BigNumber } from 'ethers'

import { usdcAddress as _usdcAddress, usdcABI } from '../..'
import { useContractWrite, usePrepareContractWrite } from '../contracts'

export interface ContractReturn {
  data: import('@wagmi/core').SendTransactionResult | undefined
  status: ReturnType<typeof useContractWrite>['status']
  writeError: Error | null
  write: ReturnType<typeof useContractWrite>['write']
}

export type UsdcArgs = {
  spender: string
  amount: number
  usdcAddress?: `0x${string}`
}

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
