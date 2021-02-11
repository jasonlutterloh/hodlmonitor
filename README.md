# Crypto Value Monitor

The purpose of this app is to provide one place to view/monitor your crypto holdings spread across different wallets and systems.

It is somewhat rudimentary in functionality (on purpose) as I was annoyed by the over-cluttered folio apps available and the API keys (security risks) they required. This app is probably only useful if you are hodling across a few different wallets and services and just want one place to monitor the value of your holdings.

Also, it's worth noting that I only built this out far enough to run locally. (For more on this, read below...)

## Getting Started

### Prerequisites

1. You must get an API key from [Nomics](https://p.nomics.com/pricing#free-plan). These are free.
2. Update the `src/nomicsKey.json` file with your key.
3. Update the `src/wallet.json` file with the crypto holdings you want to monitor.

#### Example

```json
  {
    "wallet": [
      {
        "symbol": "BTC",
        "amountHeld": 5
      },
      {
        "symbol": "ETH",
        "amountHeld": 25
      },
    ]
  }
```

### Installation

1. Clone the repo
2. `cd cryptovaluemonitor`
3. Run `npm install`
4. Run `npm run dev`
5. Go to `http://localhost:5000` (this port may be different on your machine)

_Voila!_

## Additional Notes

I only got as far as building this to run locally because that was my use case. There's a lot that could be done, though...
You could buildand deploy it hardcoded with your data to your own server so its available anywhere. You could build it out with a login and store information by user (although, you'd need to pay for Nomics API at that point).
