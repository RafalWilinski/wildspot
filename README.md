![Wildspot](/assets/logo/logo.png?raw=true "Wildspot.co")

[![CircleCI](https://circleci.com/gh/RafalWilinski/wildspot/tree/master.svg?style=shield)](https://circleci.com/gh/RafalWilinski/wildspot/tree/master)

Repo for [wildspot.co](https://wildspot.co) project.

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
