import {
  memberCardABI,
  memberCardAddress,
  useBankSocialActivity,
  useCreateDAO,
} from 'wagmi-banksocial'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

const Page = () => {
  const isMounted = useIsMounted()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
  const { activities } = useBankSocialActivity({
    API_URL: API_URL,
    contractAddress: memberCardAddress,
    contractABI: memberCardABI,
  })

  const { write } = useCreateDAO({
    initBaseURI: 'test',
    maxSupply: 10,
    minStake: 1,
    name: 'test',
  })

  async function log() {
    console.log('daoActivities', activities)
  }

  // const { data } = useContractRead({
  //   address: socialBankAddress,
  //   abi: socialBankABI,
  //   functionName: 'dAOVaultFactory',
  //   args: undefined,
  //   // enabled: profileId !== undefined,
  // })
  // console.log('🚀 ~ file: index.tsx ~ line 48 ~ Page ~ data', data)

  // const USDCTokenAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
  // const aTokenAddress = '0x625E7708f30cA75bfd92586e17077590C60eb4cD'
  // const aavePoolAddress = '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb'
  // const swapAddress = '0xC7cF646eDB2425613624adD90C4fAA1cf86136E1'

  // const { config, error: prepareError } = usePrepareContractWrite({
  //   address: socialBankAddress,
  //   abi: socialBankABI,
  //   functionName: 'createDAO',
  //   args: [
  //     'test',
  //     'test',
  //     USDCTokenAddress,
  //     aTokenAddress,
  //     aavePoolAddress,
  //     swapAddress,
  //     BigNumber.from(10),
  //     BigNumber.from(1),
  //   ],
  // })

  // const { write, data, error: writeError, status } = useContractWrite(config)
  // console.log('🚀 ~ file: index.tsx ~ line 75 ~ Page ~ data', data)

  if (!isMounted) return null
  return (
    <>
      <Connect />
      <Account />
      <NetworkSwitcher />
      <p>BankScial</p>
      <div>Balance: Not defined</div>
      <button onClick={log}>hello</button>
      {/* <button onClick={createDAO}>create dao</button> */}
      <button onClick={() => write && write()}>create dao</button>
    </>
  )
}

export default Page
