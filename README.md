## the-vote

The academic challenge to implement a full stack mobile voting application.

## The scope

- Building a mobile app
- Building restfull API
- Services integration

## server

The server is a nodejs express & mongodb code base that serves the application API

### Running the server

You can find the post man API documentation included under `src/server/docs` and import it into your post man to test the API live.

Before you run the server 

- [X] Make sure you have created a `.env` file that will contain the **JWT_SECRET**

Refer th `.env.example` in the **server** directory


```sh
$ yarn start
```

## Client 

The client is a react native expo codebase that consumes the Auth API provided by the server

### Running the client

Before you run the client make sure you got `expo-cli` installed on your device

```sh
$ expo start
# or yarn start
```

## Preview

![register](https://github.com/PatrickNiyogitare28/the-vote/blob/master/client/assets/register-screen.png?raw=true)
![login](https://github.com/PatrickNiyogitare28/the-vote/blob/master/client/assets/login-screen.png?raw=true)
![onboard](https://github.com/PatrickNiyogitare28/the-vote/blob/master/client/assets/vote-screen.png?raw=true)
![candidate info](https://github.com/PatrickNiyogitare28/the-vote/blob/master/client/assets/candidate-info-screen.png?raw=true)
