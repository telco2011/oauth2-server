// In-memory datastores:
var oauthAccessTokens = [],
  oauthRefreshTokens = [],
  oauthClients = [
    {
      clientId : '1lccd2q8evsl0xvbbfx7',
      clientSecret : 'J8eEfwKi6PSTVHtjWDcx7rYWhwt7K74u',
      redirectUri : ''
    }
  ],
  authorizedClientIds = {
    password: [
      '1lccd2q8evsl0xvbbfx7'
    ],
    refresh_token: [
      '1lccd2q8evsl0xvbbfx7'
    ]
  },
  users = [
    {
      id : 1,
      username: 'user',
      password: 'password'
    }
  ];

module.exports.oauthAccessTokens = oauthAccessTokens;
module.exports.oauthRefreshTokens = oauthRefreshTokens;
module.exports.oauthClients = oauthClients;
module.exports.authorizedClientIds = authorizedClientIds;
module.exports.users = users;