import { isNil } from 'lodash'
import { type Client, createClient } from './genql/generated'
import { getApiUrl } from './lib'
import { type Environment } from './types/Environment'

/**
 * A class representing the Healthie SDK.
 */
export class HealthieSdk {
  /**
   * The API key used to authenticate API requests.
   */
  readonly apiKey: string

  /**
   * The Client that calls the Healthie API.
   */
  readonly client: Client

  /**
   * The environment for which the SDK is configured (staging or production).
   * Setting the environment will make sure the correct API URL is called.
   */
  readonly environment?: Environment

  /**
   * The custom API URL to be used if provided.
   * Takes presedence over the "environment" when both are specified.
   */
  readonly apiUrl?: string

  /**
   * Creates an instance of the Healthie SDK.
   *
   * @param {Object} opts - The options for configuring the SDK.
   * @param {Environment} [opts.environment] - The environment to use for the SDK.
   * @param {string} [opts.apiUrl] - The API URL. Takes presedence over the "environment" when both are specified.
   * @param {string} opts.apiKey - The API key to use for authentication.
   * @throws {Error} Will throw an error if both `environment` and `apiUrl` are not provided.
   */
  constructor(opts: {
    environment?: Environment
    apiKey: string
    apiUrl?: string
  }) {
    this.environment = opts.environment
    this.apiKey = opts.apiKey
    this.apiUrl = opts.apiUrl

    if (isNil(this.environment) && isNil(this.apiUrl)) {
      throw new Error(
        'Both "environment" and "apiUrl" are not provided. Provide one of the two to instantiate the SDK.',
      )
    }

    const client = createClient({
      // Defining the apiUrl takes precedence over setting the environment
      url: this.apiUrl ?? getApiUrl(this.environment),
      headers: {
        Authorization: `Basic ${this.apiKey}`,
        AuthorizationSource: 'API',
      },
    })

    this.client = client
  }
}
