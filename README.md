# oauth2-server
Simple oauth2 server to obtain and validate access and refresh token.
## Install
	npm install
## Start server
	npm start
## Token Information
The token generated is a [JWT](https://jwt.io/).
## Obtain Access and Refresh Token
### Password Grant Type
To obtain a token you should POST to /oauth/token. You should include your client credentials in the Authorization header ("Basic " + client_id:client_secret base64'd), and then grant_type ("password"), username and password in the request body, for example:

- **Request Example**

	POST /oauth/token HTTP/1.1
	Host: [OAUTH2_SERVER_URL]
	Authorization: Basic Y2xpZW50OlEyeHBaVzUwVTJWamNtVjA=
	Content-Type: application/x-www-form-urlencoded

	BODY

	grant_type=password&username=user&password=password

	EXTRA INFORMATION
	- ClientID=clientid
	- ClientSecret=clientsecret

- **Response Example**
	
	BODY

	{
	  "token_type": "bearer",
	  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJhY2Nlc3NUb2tlbiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0NTI3NjQzMjd9.24Qj7UyfPknPMfzvChXuul1tse91on64mWIJaDmvP2k",
	  "expires_in": 600,
	  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJyZWZyZXNoVG9rZW4ifQ.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0NTI3NjQzMjd9.8aAcytGU_V8OKvuMw6bWthkG-9-WIZyuqVsi7I7Ngkg"
	}

### Refresh Token Grant Type
To obtain a token you should POST to /oauth/token. You should include your client credentials in the Authorization header ("Basic " + client_id:client_secret base64'd), and then grant_type ("refresh_token"), username and password in the request body, for example:

- **Request Example**

	POST /oauth/token HTTP/1.1
	Host: [OAUTH2_SERVER_URL]
	Authorization: Basic Y2xpZW50OlEyeHBaVzUwVTJWamNtVjA=
	Content-Type: application/x-www-form-urlencoded

	BODY
	grant_type=refresh_token&refresh_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJyZWZyZXNoVG9rZW4ifQ.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0NTI3NjQzMjd9.8aAcytGU_V8OKvuMw6bWthkG-9-WIZyuqVsi7I7Ngkg

	EXTRA INFORMATION
	- ClientID=clientid
	- ClientSecret=clientsecret

- **Response Example**

	BODY

	{
	  "token_type": "bearer",
	  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJhY2Nlc3NUb2tlbiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0NTI3NjQ5OTB9.2KPgFnggl9UWyIhoFSvYE0efykQqp4f18ltMSVlYk_Y",
	  "expires_in": 600,
	  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJyZWZyZXNoVG9rZW4ifQ.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0NTI3NjQ5OTB9.MFQykxh4UaeZtR5Y6Upu__gz5tA2iE2F4ZfUw2zWjG8"
	}

## Verify Access Token
To verify access token you should POST to /oauth/verify with the access_token in the body, for example:

- **Request Example**

	POST /oauth/verify HTTP/1.1
	Host: [OAUTH2_SERVER_URL]
	Content-Type: application/x-www-form-urlencoded

	BODY
	access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJhY2Nlc3NUb2tlbiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0NTI3NjQzMjd9.24Qj7UyfPknPMfzvChXuul1tse91on64mWIJaDmvP2k


Also, you can use GET to verify the access_token, for example:

- **Request Example**

	GET /oauth/verify?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJhY2Nlc3NUb2tlbiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0NTI3NjQzMjd9.24Qj7UyfPknPMfzvChXuul1tse91on64mWIJaDmvP2k HTTP/1.1
	Host: [OAUTH2_SERVER_URL]

## Decode Access Token
To decode access token information you should POST to /oauth/info with the access_token in the body, for example:

- **Request Example**

	POST /oauth/info HTTP/1.1
	Host: [OAUTH2_SERVER_URL]
	Content-Type: application/x-www-form-urlencoded

	BODY
	access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJhY2Nlc3NUb2tlbiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0NTI3NzM5MjB9.dXW3qcJspS3Ai6F43laNOsI14kcI3kGAArFyXru5Io4

Also, you can use GET to decode the access_token, for example:

- **Request Example**

	GET /oauth/info?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJhY2Nlc3NUb2tlbiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0NTI3NzM5MjB9.dXW3qcJspS3Ai6F43laNOsI14kcI3kGAArFyXru5Io4 HTTP/1.1
	Host: [OAUTH2_SERVER_URL]

# Annex
## Generate your own certificate
http://www.akadia.com/services/ssh_test_certificate.html
https://gist.github.com/stevenhaddox/1501893