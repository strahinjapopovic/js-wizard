const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'sicret.codex.development';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Invalid email or password', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
