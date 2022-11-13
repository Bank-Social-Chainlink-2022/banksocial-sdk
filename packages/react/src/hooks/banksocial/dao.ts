import { BigNumber } from 'ethers'

import { daoAddress as _daoAddress, daoABI } from '../..'
import { useContractWrite, usePrepareContractWrite } from '../contracts'

export interface ContractReturn {
  data: import('@wagmi/core').SendTransactionResult | undefined
  status: ReturnType<typeof useContractWrite>['status']
  writeError: Error | null
  write: ReturnType<typeof useContractWrite>['write']
}

export type ProposeArgs = {
  isToken: boolean
  description: string
  receiver: `0x${string}`
  tokenId: number
  daoAddress?: `0x${string}`
}

export type VoteArgs = {
  vote: boolean
  proposalId: number
  tokenId: number
  daoAddress?: `0x${string}`
}

export type NoArgs = {
  daoAddress?: `0x${string}`
}

export const usePropose = ({
  isToken,
  description,
  receiver,
  tokenId,
  daoAddress = _daoAddress,
}: ProposeArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoAddress,
    abi: daoABI,
    functionName: 'propose',
    args: [isToken, description, receiver, BigNumber.from(tokenId)],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

export const useVote = ({
  vote,
  proposalId,
  tokenId,
  daoAddress = _daoAddress,
}: VoteArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoAddress,
    abi: daoABI,
    functionName: 'vote',
    args: [vote, BigNumber.from(proposalId), BigNumber.from(tokenId)],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

export const useManualPerformUpkeep = ({
  daoAddress = _daoAddress,
}: NoArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoAddress,
    abi: daoABI,
    functionName: 'manualPerformUpkeep',
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

export const usePassTime = ({ daoAddress = _daoAddress }: NoArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoAddress,
    abi: daoABI,
    functionName: 'passTime',
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}
