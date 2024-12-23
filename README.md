# Healthie SDK

A fully typed (with auto-completion) Healthie SDK for Node.js.

This Healthie SDK provides convenient access to Healthie's GraphQL API from applications written in server-side JavaScript. The SDK also exports all of Healthie's GraphQL types.

## Disclaimer

This is not an official Healthie SDK as it's not built or maintained by the Healthie team. It's a simple wrapper around the Healthie GraphQL API that makes it easier to use in Node.js and TypeScript projects.

Healthie does have official SDKs, see https://help.gethealthie.com/article/943-healthies-api.

## Generate the SDK

```bash
yarn generate-sdk
```

## Usage

Learn more about the syntax of the SDK [here](https://genql.dev/docs).

Remember to **always call the SDK on the server** to keep your API key secure.

```javascript
import { HealthieSdk } from '@awell-health/healthie-sdk'

// Create the SDK
const sdk = new HealthieSdk({
  environment: 'staging',
  apiKey: 'YOUR_API_KEY',
})

// Perform your query our mutation
const result = await sdk.client.query({
  organization: {
    __args: {
      id: '775019',
    },
    organization_email: true,
    name: true,
  },
})
```

### Batching requests

You can minimize network requests and server load fetching queries that are near in time using batching.

```typescript
const sdk = new HealthieSdk({
  environment: 'staging',
  apiKey: 'YOUR_API_KEY',
})

// These queries will trigger only one network request
const res = await Promise.all([
  sdk.client.query({
    organization: {
      __args: {
        id: '1',
      },
      organization_email: true,
      name: true,
    },
  }),
  sdk.client.query({
    organization: {
      __args: {
        id: '2',
      },
      organization_email: true,
      name: true,
    },
  }),
])
```

### Types

Browse all types [here](https://github.com/awell-health/healthie-sdk/blob/main/src/genql/generated/schema.ts).

Types can be imported as follows:

```javascript
import { type User } from '@awell-health/healthie-sdk'
```

## Configuration

The SDK can be initialized with the following options:

```javascript
const sdk = new HealthieSdk({
  environment: 'staging',
  apiUrl: 'https://staging-api.gethealthie.com/graphql',
  apiKey: 'YOUR_API_KEY',
})
```

| Option      | Required | Description                                                                                                                                                                                     |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| environment | No\*     | The Healthie environment to use for the SDK. The SDK will automatically target the correct endpoint for the environment you specified. Following options are allowed: `staging` \| `production` |
| apiUrl      | No\*     | The API URL. Takes presedence over the "environment" when both are specified.                                                                                                                   |
| apiKey      | Yes      | The API key to use for authentication.                                                                                                                                                          |

\* The SDK will throw an error if neither environment nor apiUrl is provided.
