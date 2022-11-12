import { BigNumber } from 'ethers'

import {
  aaveAToken,
  poolAddress,
  socialBankABI,
  socialBankAddress,
  swapAddress,
  usdcAddress,
} from '../..'
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

export type DaosByAddressArgs = {
  daoId: number
}

export type CreateDaoArgs = {
  name: string
  initBaseURI: string
  maxSupply: number
  minStake: number
}

/** read contract */
export const useDaosById = ({
  daoId,
}: DaosByAddressArgs): ReturnType<typeof useContractRead> => {
  return useContractRead({
    address: socialBankAddress,
    abi: socialBankABI,
    functionName: 'getDAOsById',
    args: [BigNumber.from(daoId)],
  })
}

/** write contract */
export const useCreateDAO = ({
  name = 'test',
  initBaseURI = 'test',
  maxSupply = 10,
  minStake = 1,
}: CreateDaoArgs) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    address: socialBankAddress,
    abi: socialBankABI,
    functionName: 'createDAO',
    args: [
      name,
      initBaseURI,
      usdcAddress,
      aaveAToken,
      poolAddress,
      swapAddress,
      BigNumber.from(maxSupply),
      BigNumber.from(minStake),
    ],
  })

  const { write, data, error: writeError, status } = useContractWrite(config)
  return { write, data, writeError, prepareError, status }
}

// GetDAObyId
// GetDAOSbyId

// return {
//   /** SocialBankCore */
//   createDAO: () => {},
//   joinDAO: () => {},
//   depositInDAO: () => {},
//   unstakeInDAO: () => {},
//   unstakeFullInDAO: () => {},
//   propose: () => {},
//   vote: () => {},
//   daoActivities: daoEvents,
//   vaultActivities: {},
//   memberActivities: {},
//   /** ??? */
//   socialBankActivities: {},
// }
