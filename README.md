# SDK

hooks to fetch and interact with bank-social smart contracts

## Documentation

For full documentation and examples, visit [wagmi.sh](https://wagmi.sh).

## Installation

Install wagmi and its ethers peer dependency.

```bash
npm install wagmi-banksocial ethers
```

## Quick Start

### Get Activites

#### Config

```jsx
import { WagmiConfig, createClient } from 'wagmi-banksocial'
import { getDefaultProvider } from 'ethers'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

function App() {
  return (
    <WagmiConfig client={client}>
      <Profile />
    </WagmiConfig>
  )
}
```

#### Install

```bash
npm install wagmi-banksocial ethers
```

#### Import

```js
import {
  memberCardABI,
  memberCardAddress,
  useBankSocialActivity,
} from 'wagmi-banksocial'
```

#### Initiate hook

```js
const API_URL = 'Get Polygon RPC URL from Infura, Alchemy or Quicknode'
const { activities } = useBankSocialActivity({
  API_URL: API_URL,
  contractAddress: memberCardAddress,
  contractABI: memberCardABI,
})
```

#### Use

```jsx
;<h2>Vault Activities</h2>
{
  activities &&
    activities.map((activity, i) => (
      <div key={i}>
        {activity.eventName === 'RoleGranted' && (
          <div className="text-white">
            <p>Account: {activity.data.account}</p>
            <p>Role: {activity.data.role}</p>
            <p>Sender: {activity.data.sender}</p>
          </div>
        )}
      </div>
    ))
}
```

### Create a DAO

```jsx
const { write, data } = useCreateDAO({
  initBaseURI: 'test',
  maxSupply: 10,
  minStake: 1,
  name: 'test',
})

//...
return <button onClick={() => write && write()}>create dao</button>
```

—

Check out [ConnectKit](https://docs.family.co/connectkit?utm_source=wagmi-dev) to get started with pre-built interface on top of wagmi for managing wallet connections.

## Community

Check out the following places for more wagmi-related content:

- Join the [discussions on GitHub](https://github.com/wagmi-dev/wagmi/discussions)
- Follow [@wagmi_sh](https://twitter.com/wagmi_sh) on Twitter for project updates
- Share [your project/organization](https://github.com/wagmi-dev/wagmi/discussions/201) using wagmi
- Browse the [awesome-wagmi](https://github.com/wagmi-dev/awesome-wagmi) list of awesome projects and resources

## Support

If you find wagmi useful, please consider supporting development. Thank you 🙏

- [GitHub Sponsors](https://github.com/sponsors/wagmi-dev?metadata_campaign=gh_readme_support)
- [Gitcoin Grant](https://gitcoin.co/grants/4493/wagmi-react-hooks-library-for-ethereum)
- [wagmi-dev.eth](https://etherscan.io/enslookup-search?search=wagmi-dev.eth)

## Contributing

If you're interested in contributing, please read the [contributing docs](/.github/CONTRIBUTING.md) **before submitting a pull request**.

## License

[MIT](/LICENSE) License

<br />

<a href="https://vercel.com/?utm_source=wagmi-dev&utm_campaign=oss">
  <img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by Vercel" height="35">
</a>
