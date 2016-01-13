// In-memory datastores:
var oauthAccessTokens = [],
  oauthRefreshTokens = [],
  oauthClients = [
    {
      clientId : 'clientid',
      //ClientSecret=ClientSecret
      clientSecret : 'clientsecret',
      redirectUri : ''
    }
  ],
  authorizedClientIds = {
    password: [
      'clientid'
    ],
    refresh_token: [
      'clientid'
    ]
  },
  users = [
    {
      id : '1',
      username: 'user',
      password: 'password'
    }
  ];

module.exports.oauthAccessTokens = oauthAccessTokens;
module.exports.oauthRefreshTokens = oauthRefreshTokens;
module.exports.oauthClients = oauthClients;
module.exports.authorizedClientIds = authorizedClientIds;
module.exports.users = users;