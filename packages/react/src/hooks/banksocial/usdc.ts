import { BigNumber } from 'ethers'

import { usdcABI, usdcAddress } from '../..'
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
}

export type UnstakeArgs = {
  tokenId: number
}

export const useUSDCApprove = ({ spender, amount }: UsdcArgs) => {
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
