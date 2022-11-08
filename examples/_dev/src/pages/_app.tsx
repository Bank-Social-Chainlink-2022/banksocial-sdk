import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import {
  WagmiConfig,
  chain,
  configureChains,
  createClient,
  defaultChains,
} from 'wagmi-banksocial'

import { CoinbaseWalletConnector } from 'wagmi-banksocial/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi-banksocial/connectors/injected'
import { MetaMaskConnector } from 'wagmi-banksocial/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi-banksocial/connectors/walletConnect'

import { alchemyProvider } from 'wagmi-banksocial/providers/alchemy'
import { publicProvider } from 'wagmi-banksocial/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [...defaultChains, chain.polygon, chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    publicProvider(),
  ],
  { targetQuorum: 1 },
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi-banksocial',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: (detectedName) =>
          `Injected (${
            typeof detectedName === 'string'
              ? detectedName
              : detectedName.join(', ')
          })`,
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </>
  )
}

export default App
