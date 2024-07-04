const database = {
  users: {},
};

function refreshDatabase() {
  database.users = {};
}

module.exports = { database, refreshDatabase };
