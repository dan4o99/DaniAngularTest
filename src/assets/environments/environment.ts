export const environment = {
  auth: {
    Cognito: {
      loginWith: {
        oauth: {
          domain: 'http://localhost:4200',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: ['localhost:4200'],
          redirectSignOut: ['localhost:4200'],
          responseType: 'token',
          providers: ['Google'],
        },
      },
      userPoolId: 'eu-central-1_8NA2gbWBI',
      userPoolClientId: '5k65dtnfj666niptqb1e9d550b',
    },
  },
};
