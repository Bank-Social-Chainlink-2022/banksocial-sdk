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

### Getting started

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
  const API_URL = "Get Mumbai RPC URL from Infura, Alchemy or Quicknode"
  const { activities } = useBankSocialActivity({
    API_URL: API_URL,
    contractAddress: memberCardAddress,
    contractABI: memberCardABI,
  })
```

#### Use

```jsx

<h2>Vault Activities</h2>;
{
  activities &&
    activities.map((activity, i) => (
      <div key={i}>
        {activity.eventName === "RoleGranted" && (
          <div className="text-white">
            <p>Account: {activity.data.account}</p>
            <p>Role: {activity.data.role}</p>
            <p>Sender: {activity.data.sender}</p>
          </div>
        )}
      </div>
    ));
}

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

## Sponsors

<a href="https://twitter.com/family">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-dark.svg">
    <img alt="family logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://twitter.com/context">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/context-dark.svg">
    <img alt="context logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/context-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://walletconnect.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/walletconnect-dark.svg">
    <img alt="WalletConnect logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/walletconnect-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://looksrare.org">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/8923685e23fe9708b74d456c3f9e7a2b90f6abd9/content/sponsors/looksrare-dark.svg">
    <img alt="LooksRare logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/8923685e23fe9708b74d456c3f9e7a2b90f6abd9/content/sponsors/looksrare-light.svg" width="auto" height="50">
  </picture>
</a>

## Contributing

If you're interested in contributing, please read the [contributing docs](/.github/CONTRIBUTING.md) **before submitting a pull request**.

## Authors

- awkweb.eth ([@awkweb](https://twitter.com/awkweb)) – [Mirror](https://mirror.xyz)
- moxey.eth ([@jakemoxey](https://twitter.com/jakemoxey)) – [Rainbow](https://rainbow.me)

Thanks to julianhutton.eth ([@julianjhutton](https://twitter.com/julianjhutton)) for providing the awesome logo!

## License

[MIT](/LICENSE) License

<br />

<a href="https://vercel.com/?utm_source=wagmi-dev&utm_campaign=oss">
  <img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by Vercel" height="35">
</a>
