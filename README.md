![Wildspot](/assets/logo/logo.png?raw=true "Wildspot.co")

[![CircleCI](https://circleci.com/gh/RafalWilinski/wildspot/tree/master.svg?style=shield)](https://circleci.com/gh/RafalWilinski/wildspot/tree/master)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/wildspot-co)


Repo for [wildspot.co](https://wildspot.co) project.

![Wildspot](/src/images/wildspot_1.gif?raw=true "Wildspot.co")

### Development

Before running anything, copy `.env.TEMPLATE` to `.env` file and fill all the values. Then:

```sh
yarn start
```

### Deploying

As this project is just a page with bunch of JS, after build everything is just pushed to AWS S3 and then served via CloudFront. To deploy app simply execute following command:

```
yarn deploy
```

### Feature requests and bugs

Please submit any feature requests and bugs in [Issues](https://github.com/RafalWilinski/wildspot/issues) section or using [Trello Board](https://trello.com/b/Q7onKpPF/wildspotco-features).


https://spectrum.chat/wildspot-co