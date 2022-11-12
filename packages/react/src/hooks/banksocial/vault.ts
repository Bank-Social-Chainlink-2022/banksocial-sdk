import { BigNumber } from 'ethers'

import { daoVaultABI, daoVaultAddress } from '../..'
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

export const useStake = ({ amount }: StakeArgs) => {
  // USDC has 6 decimals
  const amountFormatUSDC = amount * 10 ** 6

  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoVaultAddress,
    abi: daoVaultABI,
    functionName: 'stake',
    args: [BigNumber.from(amountFormatUSDC)],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

export const useUnstake = ({ tokenId }: UnstakeArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoVaultAddress,
    abi: daoVaultABI,
    functionName: 'unstakeFull',
    args: [BigNumber.from(tokenId)],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

export const useHarvest = () => {
  const { address } = useAccount()

  const { config, error: prepareError } = usePrepareContractWrite({
    address: daoVaultAddress,
    abi: daoVaultABI,
    functionName: 'harvestYieldTest',
    args: [address || '0x', true], // ...
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}
