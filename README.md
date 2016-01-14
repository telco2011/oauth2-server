# oauth2-server
Simple oauth2 server to obtain and validate access and refresh token.

## Install
	npm install

## Start server
	npm start

## Obtain Access Token and Refresh Token
### Password Grant Type
To obtain a token you should POST to /oauth/token. You should include your client credentials in the Authorization header ("Basic " + client_id:client_secret base64'd), and then grant_type ("password"), username and password in the request body, for example:

	POST /oauth/token HTTP/1.1
	Host: [OAUTH2_SERVER]
	Authorization: Basic Y2xpZW50OlEyeHBaVzUwVTJWamNtVjA=
	Content-Type: application/x-www-form-urlencoded

	BODY
	grant_type=password&username=client&password=password

	EXTRA INFORMATION
	ClientID=clientId
	ClientSecret=Q2xpZW50U2VjcmV0 - [ClientSecret]

### Refresh Token Grant Type
To obtain a token you should POST to /oauth/token. You should include your client credentials in the Authorization header ("Basic " + client_id:client_secret base64'd), and then grant_type ("refresh_token") and refresh_token in the request body, for example:

	POST /oauth/token HTTP/1.1
	Host: [OAUTH2_SERVER]
	Authorization: Basic Y2xpZW50OlEyeHBaVzUwVTJWamNtVjA=
	Content-Type: application/x-www-form-urlencoded

	BODY
	grant_type=refresh_token&refresh_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJyZWZyZXNoVG9rZW4ifQ.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0NTI3MDE3NjV9.MY2f0CV5L2zVaEV1oo1vNv0TCxxOKXzMqsiUJwrXMSQ

	EXTRA INFORMATION
	ClientID=clientId
	ClientSecret=Q2xpZW50U2VjcmV0 - [ClientSecret]