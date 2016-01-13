// In-memory datastores:
var oauthAccessTokens = [],
  oauthRefreshTokens = [],
  oauthClients = [
    {
      clientId : 'clientId',
      //ClientSecret=ClientSecret
      clientSecret : 'Q2xpZW50U2VjcmV0',
      redirectUri : ''
    }
  ],
  authorizedClientIds = {
    password: [
      'client'
    ],
    refresh_token: [
      'client'
    ]
  },
  users = [
    {
      id : '1',
      username: 'client',
      password: 'password'
    }
  ];

module.exports.oauthAccessTokens = oauthAccessTokens;
module.exports.oauthRefreshTokens = oauthRefreshTokens;
module.exports.oauthClients = oauthClients;
module.exports.authorizedClientIds = authorizedClientIds;
module.exports.users = users;