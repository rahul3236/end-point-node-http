const createToken = async (keyPath) => {
  const scope = ['https://level01.io'];
  const { GoogleToken } = require('gtoken');
  const gtoken = new GoogleToken({
    keyFile: keyPath || './svc-caller-key.json',
    scope: scope
  });

  return gtoken.getToken()
    .then(token => {
      return token;
    })
    .catch(ex => {
      console.error(ex);
      throw ex;
    });
}

module.exports = {
  createToken,
}