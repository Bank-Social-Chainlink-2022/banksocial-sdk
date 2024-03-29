import { useState } from 'react'
import {
  aaveATokenAddress,
  // daoAddress,
  memberCardABI,
  memberCardAddress,
  poolAddress,
  socialBankAddress,
  swapAddress,
  usdcAddress,
  useAccount,
  useBankSocialActivity,
  useCreateDAO,
  useDAOAddress,
  useDaosById,
  useManualPerformUpkeep,
  usePassTime,
  usePropose,
  useStake,
  useUSDCAllowance,
  useUSDCApprove,
  useUnstake,
  useVaultAddress,
  useVote,
} from 'wagmi-banksocial'

import { Account, Connect, NetworkSwitcher } from '../components'
import { UploadIPFS } from '../components/UploadToIPFS'
import { useIsMounted } from '../hooks'

const daoVaultAddress = '0xd496F1ba28e8987400da49ACAF5893fd1e36b211'
const daoAddress = '0xD8453901298557BfaaC07F259343e295F7221783'

const Page = () => {
  const [voteInfo, setVoteInfo] = useState({
    vote: false,
    proposalId: 0,
    tokenId: 0,
  })
  const isMounted = useIsMounted()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
  const { activities } = useBankSocialActivity({
    API_URL,
    contractAddress: memberCardAddress,
    contractABI: memberCardABI,
    network: 'polygon', // 'goerli'
  })

  const { address } = useAccount()

  /** social bank core */
  const { write: _createDAO } = useCreateDAO({
    initBaseURI:
      'https://gateway.ipfscdn.io/ipfs/QmWdECjgH7bTgQJuYH3o32dnCVenAvygzZ8rHHZnPMFg7N/',
    maxSupply: 10,
    minStake: 1,
    name: 'City DAO',
    socialBankAddress: socialBankAddress,
    usdcAddress: usdcAddress,
    aaveAToken: aaveATokenAddress,
    poolAddress: poolAddress,
    swapAddress: swapAddress,
  })

  const { data: deployedVaultAddress } = useVaultAddress({
    daoId: 7,
    socialBankAddress: socialBankAddress,
  })
  console.log('deployedVaultAddress : ', deployedVaultAddress)

  const { data: deployedDaoAddress } = useDAOAddress({
    daoId: 7,
    socialBankAddress: socialBankAddress,
  })
  console.log('deployedDaoAddress : ', deployedDaoAddress)

  /** USDC contract */
  const { write: _approveUSDC } = useUSDCApprove({
    spender: daoVaultAddress,
    amount: 10,
    usdcAddress: usdcAddress,
  })
  const { data: allowance } = useUSDCAllowance({
    owner: address || '0x123',
    spender: daoVaultAddress,
  })
  console.log('🚀 ~ file: index.tsx ~ line 85 ~ Page ~ allowance', allowance)

  /** Start with Vault */

  const { write: _stake } = useStake({
    amount: 1,
    daoVaultAddress: daoVaultAddress,
  })
  const { write: _unstake } = useUnstake({
    tokenId: 0,
    daoVaultAddress: daoVaultAddress,
  }) // Change tokenId to yours

  /** The DAO */
  const { write: _propose } = usePropose({
    isToken: false,
    description: 'test',
    receiver: address ? address : '0x123',
    tokenId: 1, // Change tokenId to yours
    daoAddress: daoAddress,
  })
  const { write: _vote } = useVote({
    vote: voteInfo.vote,
    proposalId: 1,
    tokenId: 1, // Change tokenId to yours
    daoAddress: daoAddress,
  })

  const { write: _performUpkeep } = useManualPerformUpkeep({
    daoAddress: daoAddress,
  })
  const { write: _passTime } = usePassTime({
    daoAddress: daoAddress,
  })

  /** The Member (Not needed right) */
  // const _mint = useMemberMint({})

  /** Read Contract */
  const { data: daoIds } = useDaosById({
    daoId: 0,
    socialBankAddress: socialBankAddress,
  })
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

  const propose = () => {
    _propose && _propose()
  }

  const vote = () => {
    _vote && _vote()
  }

  const yesVote = () => {
    setVoteInfo({ vote: true, proposalId: 0, tokenId: 0 }) // Change tokenId to yours
    vote()
  }

  const performUpkeep = () => {
    _performUpkeep && _performUpkeep()
  }

  const passTime = () => {
    _passTime && _passTime()
  }

  // const mint = () => {
  //   if (_mint) {
  //     const { write } = _mint
  //     write && write()
  //   }
  // }

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
      <p>Interact with DAO</p>
      <button onClick={() => propose()}>Propose</button>
      <button onClick={() => vote()}>Vote</button>
      <button onClick={() => yesVote()}>Yes Vote</button>
      <button onClick={() => performUpkeep()}>Perform Upkeep</button>
      <button onClick={() => passTime()}>Pass Time</button>
      <UploadIPFS></UploadIPFS>
    </>
  )
}

export default Page

// Not implemented get owner all NFTs ID.
// Not implemented get all proposals ID.
