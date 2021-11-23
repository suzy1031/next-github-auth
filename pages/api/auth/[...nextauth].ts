import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      scope: '',
    }),
  ],
  callbacks: {
    async signIn(_user, _account, _profile) {
      console.log('signIn!');
      return true;
    },

    async redirect(url, baseUrl) {
      console.log('redirect!');
      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    async jwt(token, _user, account, _profile, _isNewUser) {
      console.log('jwt!');

      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }

      return token;
    },

    async session(session, token) {
      console.log('session!');

      session.accessToken = token.accessToken;
      return session;
    },
  },
});
