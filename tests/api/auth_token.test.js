const { spec } = require('pactum');
const { expect } = require('chai');

// Global variable to store access token
let accessToken = null;

describe('Authentication Token API Tests', () => {

  it('should obtain access token with client credentials', async () => {
    // Step 1: Set up the request
    const authEndpoint = 'https://nera-qa.comafi.com.ar/auth/realms/hbe-sso/protocol/openid-connect/token';
    const headers = {
      'User-Agent': 'NeraApis',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic NTg3MmQyMTA6YjE4MzM4MjExZTJmNjUyN2VjMDRlYWRhMmM1NTYyNTI=',
      'Cookie': '4ea47a54ebc11dec0d7f9f38a0dbd17b=3651fc6cc67025843ea6ed311404872c; 99b47315582a09f5cfd4f2a7c0ac7a2f=1eb1ed87a6bfcdf28757e5e6c05788cd'
    };
    const requestBody = 'grant_type=client_credentials';

    // Step 2: Make the API request
    const response = await spec()
      .post(authEndpoint)
      .withHeaders(headers)
      .withBody(requestBody)
      .expectStatus(200)
      .toss();

    // Step 3: Verify the response
    expect(response.statusCode).to.equal(200);
    
    // Verify access_token
    expect(response.body).to.have.property('access_token');
    expect(response.body.access_token).to.be.a('string');
    expect(response.body.access_token).to.not.be.empty;
    
    // Verify complete token response structure
    expect(response.body).to.have.property('expires_in');
    expect(response.body.expires_in).to.be.a('number');
    expect(response.body.expires_in).to.equal(1800);
    
    expect(response.body).to.have.property('refresh_expires_in');
    expect(response.body.refresh_expires_in).to.be.a('number');
    expect(response.body.refresh_expires_in).to.equal(0);
    
    expect(response.body).to.have.property('token_type');
    expect(response.body.token_type).to.be.a('string');
    expect(response.body.token_type).to.equal('bearer');
    
    expect(response.body).to.have.property('not-before-policy');
    expect(response.body['not-before-policy']).to.be.a('number');
    expect(response.body['not-before-policy']).to.equal(0);
    
    expect(response.body).to.have.property('scope');
    expect(response.body.scope).to.be.a('string');
    expect(response.body.scope).to.equal('email profile');

    // Step 4: Save the access token for future use
    accessToken = response.body.access_token;
    console.log('✅ Access token obtained and saved:', accessToken);

    // Verify the token was saved
    expect(accessToken).to.be.a('string');
    expect(accessToken).to.not.be.empty;
  });

  it('should use saved access token for subsequent requests', () => {
    // This test demonstrates how to use the saved token
    if (accessToken) {
      console.log('🔑 Using saved access token:', accessToken);
      expect(accessToken).to.be.a('string');
    } else {
      console.log('⚠️ No access token available');
    }
  });

});

// Helper function to get the access token (outside describe block)
function getAccessToken() {
  return accessToken;
}

// Export for use in other tests
module.exports = {
  getAccessToken
};
