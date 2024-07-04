const { refreshDatabase } = require("../database");

class GlobalService {
  resetDatabase() {
    refreshDatabase();
  }
}

module.exports = { GlobalService };
