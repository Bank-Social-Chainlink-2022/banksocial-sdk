import { BigNumber } from 'ethers'

import { daoABI, daoAddress } from '../..'
import { useContractWrite, usePrepareContractWrite } from '../contracts'

export interface ContractReturn {
  data: import('@wagmi/core').SendTransactionResult | undefined
  status: ReturnType<typeof useContractWrite>['status']
  writeError: Error | null
  write: ReturnType<typeof useContractWrite>['write']
}

export type ProposeArgs = {
  amount: number
  isToken: boolean
  description: string
  receiver: `0x${string}`
  tokenId: number
}

export type VoteArgs = {
  vote: boolean
  proposalId: number
  tokenId: number
}

export const usePropose = ({
  amount,
  isToken,
  description,
  receiver,
  tokenId,
}: ProposeArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoAddress,
    abi: daoABI,
    functionName: 'propose',
    args: [
      BigNumber.from(amount),
      isToken,
      description,
      receiver,
      BigNumber.from(tokenId),
    ],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

export const useVote = ({ vote, proposalId, tokenId }: VoteArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoAddress,
    abi: daoABI,
    functionName: 'vote',
    args: [vote, BigNumber.from(proposalId), BigNumber.from(tokenId)],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}
