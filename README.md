![Wildspot](/assets/logo/logo.png?raw=true "Wildspot.co")

Repo for [wildspot.co] project.

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

Please submit any feature requests and bugs in [Issues]() section or using [Trello Board](https://trello.com/b/Q7onKpPF/wildspotco-features).
