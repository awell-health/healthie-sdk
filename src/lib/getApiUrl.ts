import { type Environment } from '../types/Environment'

/**
 * Returns the appropriate API URL based on the specified environment.
 *
 * @param {Environment} [environment] - The environment to use for determining the API URL.
 *    Possible values include:
 *      - "staging": Staging environment URL
 *      - "production": Production environment URL
 * @returns {string} The appropriate API URL for the given environment, the default API URL is Sandbox.
 */
export const getApiUrl = (environment?: Environment): string => {
  const DEFAULT_API_URL = 'https://staging-api.gethealthie.com/graphql'

  switch (environment) {
    case 'staging':
      return 'https://staging-api.gethealthie.com/graphql'
    case 'production':
      return 'https://api.gethealthie.com/graphql'
    default:
      return DEFAULT_API_URL
  }
}
