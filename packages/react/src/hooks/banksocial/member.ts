import { memberCardABI, memberCardAddress } from '../..'
import { useAccount } from '../accounts'
import { useContractWrite, usePrepareContractWrite } from '../contracts'

export interface ContractReturn {
  data: import('@wagmi/core').SendTransactionResult | undefined
  status: ReturnType<typeof useContractWrite>['status']
  writeError: Error | null
  write: ReturnType<typeof useContractWrite>['write']
}

export type StakeArgs = {
  amount: number
}

export type UnstakeArgs = {
  tokenId: number
}

export const useMemberMint = () => {
  const { address } = useAccount()

  const { config, error: prepareError } = usePrepareContractWrite({
    address: memberCardAddress,
    abi: memberCardABI,
    functionName: 'mint',
    args: [address || '0x'], //...
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}
