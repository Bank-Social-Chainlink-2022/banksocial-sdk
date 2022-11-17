import { Abi, Narrow } from 'abitype'

import { memberCardAddress as _memberCardAddress, memberCardABI } from '../..'
import { useAccount } from '../accounts'
import { useContractWrite, usePrepareContractWrite } from '../contracts'

export interface ContractReturn {
  data: import('@wagmi/core').SendTransactionResult | undefined
  status: ReturnType<typeof useContractWrite>['status']
  writeError: Error | null
  write: ReturnType<typeof useContractWrite>['write']
}

export type MemberArgs = {
  memberCardAddress?: `0x${string}`
  abi?: Narrow<Abi | readonly []>
}

/**
 * @example
 *
 * const _mint = useMemberMint({})
 */
export const useMemberMint = ({
  memberCardAddress = _memberCardAddress,
  abi = memberCardABI,
}: MemberArgs) => {
  const { address } = useAccount()

  const { config, error: prepareError } = usePrepareContractWrite({
    address: memberCardAddress,
    abi,
    functionName: 'mint',
    args: [address || '0x'], //...
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}
