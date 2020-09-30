const { decodeBase64 } = require("bcryptjs");


class AppDatabaseManager {

    fetchUserByUsername(username) {
        return db.query("SELECT * FROM user WHERE username = ?", username).then(rows => {
            return rows;
        });
    }

    doRegister(register) {
        return db.query("INSERT INTO user (username, email, password) VALUES (?, ?, ?)", [
            register.username,
            register.email,
            register.password
        ]);

    }
}
module.exports = AppDatabaseManager;