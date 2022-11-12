import {
  daoVaultAddress,
  memberCardABI,
  memberCardAddress,
  useAccount,
  useBankSocialActivity,
  useCreateDAO,
  useDaosById,
  // useHarvest, Removed from contract
  useMemberMint,
  usePropose,
  useStake,
  useUSDCApprove,
  useUnstake,
  useVote,
} from 'wagmi-banksocial'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

const Page = () => {
  const isMounted = useIsMounted()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
  const { activities } = useBankSocialActivity({
    API_URL,
    contractAddress: memberCardAddress,
    contractABI: memberCardABI,
  })

  const { address } = useAccount()

  const { write: _createDAO } = useCreateDAO({
    initBaseURI: 'test',
    maxSupply: 10,
    minStake: 1,
    name: 'test',
  })

  /** Start with DAO Vault */
  const { write: _approveUSDC } = useUSDCApprove({
    spender: daoVaultAddress,
    amount: 10,
  })
  const { write: _stake } = useStake({ amount: 1 })
  // TODO get owner all NFTs ID.
  const { write: _unstake } = useUnstake({ tokenId: 1 }) // Change tokenId to yours
  // const _harvest = useHarvest()

  /** The DAO */
  const { write: _propose } = usePropose({
    amount: 10,
    isToken: false,
    description: 'test',
    receiver: address ? address : '0x123',
    tokenId: 1, // Change tokenId to yours
  })
  // TODO get all proposals ID.
  const { write: _vote } = useVote({ vote: true, proposalId: 0, tokenId: 1 })
  const _mint = useMemberMint()

  /** Read Contract */
  const { data: daoIds } = useDaosById({ daoId: 1 })
  console.log('🚀 ~ file: index.tsx ~ line 57 ~ Page ~ daoIds', daoIds)

  const createDAO = () => {
    _createDAO && _createDAO()
  }

  const approve = () => {
    _approveUSDC && _approveUSDC()
  }

  const stake = () => {
    _stake && _stake()
  }

  const unstake = () => {
    _unstake && _unstake()
  }

  // const harvest = () => {
  //   if (_harvest) {
  //     const { write } = _harvest
  //     write && write()
  //   }
  // }

  const propose = () => {
    _propose && _propose()
  }

  const vote = () => {
    _vote && _vote()
  }

  const mint = () => {
    if (_mint) {
      const { write } = _mint
      write && write()
    }
  }

  async function log() {
    console.log('daoActivities', activities)
  }

  if (!isMounted) return null
  return (
    <>
      <Connect />
      <Account />
      <NetworkSwitcher />
      <p>BankScial</p>
      <div>Balance: Not defined</div>
      <button onClick={log}>Log</button>
      <p>Interact with socialbankcore</p>
      <button onClick={() => createDAO()}>create dao</button>
      <p>Interact with Vault</p>
      <button onClick={() => approve()}>Approve</button>
      <button onClick={() => stake()}>Stake</button>
      <button onClick={() => unstake()}>Unstake</button>
      {/* <button onClick={() => harvest()}>harvest</button> */}
      <p>Interact with DAO</p>
      <button onClick={() => propose()}>Propose</button>
      <button onClick={() => vote()}>Vote</button>
      <p>Interact with Member</p>
      <button onClick={() => mint()}>Mint (integrated with stake)</button>
    </>
  )
}

export default Page
