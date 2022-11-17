import { Abi, Narrow } from 'abitype'
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
  abi?: Narrow<Abi | readonly []>
}

export type VoteArgs = {
  vote: boolean
  proposalId: number
  tokenId: number
  daoAddress?: `0x${string}`
  abi?: Narrow<Abi | readonly []>
}

export type NoArgs = {
  daoAddress?: `0x${string}`
  abi?: Narrow<Abi | readonly []>
}

/**
 * @example
 *
 * const { write: _propose } = usePropose({
 *   isToken: false,
 *   description: 'test',
 *   receiver: address ? address : '0x123',
 *   tokenId: 0, // Change tokenId to yours
 *   daoAddress: daoAddress,
 * })
 */
export const usePropose = ({
  isToken,
  description,
  receiver,
  tokenId,
  daoAddress = _daoAddress,
  abi = daoABI,
}: ProposeArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoAddress,
    abi,
    functionName: 'propose',
    args: [isToken, description, receiver, BigNumber.from(tokenId)],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

/**
 * @example
 *
 * const { write: _vote } = useVote({ vote: true, proposalId: 0, tokenId: 1 }) // Change tokenId to yours
 */
export const useVote = ({
  vote,
  proposalId,
  tokenId,
  daoAddress = _daoAddress,
  abi = daoABI,
}: VoteArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoAddress,
    abi,
    functionName: 'vote',
    args: [vote, BigNumber.from(proposalId), BigNumber.from(tokenId)],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

/**
 * @example
 *
 * const { write: _performUpkeep } = useManualPerformUpkeep({
 *   daoAddress: daoAddress,
 * })
 */
export const useManualPerformUpkeep = ({
  daoAddress = _daoAddress,
  abi = daoABI,
}: NoArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoAddress,
    abi,
    functionName: 'manualPerformUpkeep',
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

/**
 * @example
 *
 * const { write: _passTime } = usePassTime({
 *   daoAddress: daoAddress,
 * })
 */
export const usePassTime = ({
  daoAddress = _daoAddress,
  abi = daoABI,
}: NoArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoAddress,
    abi,
    functionName: 'passTime',
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}
