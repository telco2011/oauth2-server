# oauth2-server

## Install

npm install

## Start server

npm start

## Use

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