import { HealthieSdk } from '../src'

describe('HealthieSdk', () => {
  test('Client', async () => {
    const sdk = new HealthieSdk({
      environment: 'staging',
      apiKey: 'AN_API_KEY',
    })

    /**
     * This test should throw an error because the API key is invalid
     */
    await expect(
      sdk.client.query({
        organization: {
          __args: {
            id: '775019',
          },
          organization_email: true,
          name: true,
        },
      }),
    ).rejects.toThrow('API Key is Invalid')
  })
})
