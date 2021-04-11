# HODL Tracker

The purpose of this app is to provide one place to view/monitor your crypto holdings spread across different wallets and systems without the need for a complicated signup, API keys, or another password to remember.

This app runs in the browser and relies on your browser's LocalStorage to remember your wallet. (Backup coming soon.) The only service calls are to get current prices by crypto name (the app doesn't send your data anywhere).

HODL Tracker is somewhat rudimentary in functionality (on purpose) as I was annoyed by the over-cluttered folio apps available and the API keys (security risks) they required.

It's worth noting that this app is not going to be for everyone. It lacks historical trends, etc and is probably only useful if you are hodling across a few different wallets/services and just want one place to monitor the current value of your holdings.

## Demo

[Live Demo](https://hodltracker.web.app)

## Getting Started

### Installation

1. Clone the repo
2. `cd hodltracker`
3. Run `npm install`
4. Run `npm run dev`
5. Go to `http://localhost:5000` (this port may be different on your machine)

_Voila!_

## Additional Notes

I used CoinGecko's API for the data since they provide it without requiring an API key (which is amazing). Link [CoinGecko](https://www.coingecko.com/en/api).

TODO: The code needs a lot of cleanup still but at least its working.
