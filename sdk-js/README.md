# StellarRoute TypeScript SDK

Type-safe client for the StellarRoute REST API.

## Install

```bash
npm install @stellarroute/sdk-js
```

## Quickstart

### Get a quote

```ts
import { StellarRouteClient } from '@stellarroute/sdk-js';

const client = new StellarRouteClient('http://localhost:8080');
const quote = await client.getQuote(
  'native',
  'USDC:GDUKMGUGDZQK6YH...',
  100,
  'sell',
);

console.log(quote.price, quote.total);
```

### Get ranked routes

```ts
import { StellarRouteClient } from '@stellarroute/sdk-js';

const client = new StellarRouteClient('http://localhost:8080');
const result = await client.getRankedRoutes(
  'native',
  'USDC:GDUKMGUGDZQK6YH...',
  100,
  5, // limit
);

result.routes.forEach((route) => {
  console.log(`score=${route.score} output=${route.estimated_output}`);
  route.path.forEach((hop) => console.log(`  ${hop.source}: ${hop.price}`));
});
```

> **Migration note:** The legacy `getRoutes` method calls the deprecated
> `GET /api/v1/route` endpoint. Prefer `getRankedRoutes` which uses the ranked
> `GET /api/v1/routes` endpoint and returns multiple candidates with scores.

Additional runnable quickstart files are in `sdk-js/examples/`.

## API docs

Generate TypeDoc API docs:

```bash
npm run docs:api
```

Generated docs are published in `docs/sdk-js/api/`.

## Error handling

For integration guidance on retry semantics, SDK error helper usage, and user-facing error patterns, see `docs/api/integrator-error-guide.md`.
