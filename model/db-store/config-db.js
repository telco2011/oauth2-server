// In-memory datastores:
var oauthAccessTokens = [],
  oauthRefreshTokens = [],
  oauthClients = [
    {
      //clientId=ClientId
      clientId : 'clientid',
      //ClientSecret=ClientSecret
      clientSecret : 'Q2xpZW50U2VjcmV0',
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
      username: 'client',
      password: 'clientpassword'
    }
  ];

module.exports.oauthAccessTokens = oauthAccessTokens;
module.exports.oauthRefreshTokens = oauthRefreshTokens;
module.exports.oauthClients = oauthClients;
module.exports.authorizedClientIds = authorizedClientIds;
module.exports.users = users;