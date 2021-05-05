const dbInfo = require('./info');
const dbCategory = require('./category');

module.exports = (client) => {
  const info = dbInfo(client);
  const category = dbCategory(client);

  return {
    info,
    category,
  };
};
