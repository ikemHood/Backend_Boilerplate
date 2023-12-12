module.exports = {
  system: {
    port: 5550,
    node_env: "development"
  },
  mongo_db: {
    uri: 'mongodb://localhost:27017/',
  },
  jwt: {
    secret: 'abcdefghijklmnopqrstuvwsyz',
    issuer: 'backend.app.test',
    algorithm: 'HS256',
    expiresIn: 300,
    cookie: {
      expiresIn: 30,
    }
  },
  front: {
    domain: "",
  }
};
