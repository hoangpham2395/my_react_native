import { openDatabase } from 'react-native-sqlite-storage';
let db = openDatabase({ name: 'UsersDatabase.db', createFromLocation: '~myreactnative.db' });

export function getUsersDB() {
    return db;
}

export function initUsersDB() {
    let sql = "SELECT name FROM sqlite_master WHERE type='table' AND name='users'";
    let sqlCreateTable = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname VARCHAR(256), email VARCHAR(256), address VARCHAR(512), tel VARCHAR(20))';
    db.transaction(function (txn) {
        txn.executeSql(sql, [], (tx, res) => {
            if (res.rows.length === 0) {
                txn.executeSql(sqlCreateTable, []);
            }
            // Insert sample data
            txn.executeSql(usersSQL.insertSampleData, []);
        })
    });
}

export const usersSQL = {
    getList: 'SELECT id, fullname, email, address, tel FROM users',
    truncate: 'DELETE FROM users',
    insertSampleData: 'INSERT INTO users (fullname, email, address, tel) VALUES ("User 1", "user1@gmail.com", "Hanoi", "0123456789"), ("User 2", "user2@gmail.com", "HoChiMinh", "0987654321"), ("User 3", "user3@gmail.com", "ThanhHoa", "0987654123")',
};

export function getListUsers() {
    let result = [];
    let sql = usersSQL.getList;
    db.transaction((txn) => {
        txn.executeSql(sql, [], (tx, res) => {
            let len = res.rows.length;
            for (let i = 0; i < len; i++) {
                let row = res.rows.item(i);
                const {id, fullname, email, address, tel} = row;
                result.push({id, fullname, email, address, tel});
            }
        })
    });
    return result;
}

export function truncateUsersDB() {
    let sql = usersSQL.truncate;
    db.transaction((txn) => {
        txn.executeSql(sql, []);
    });
}

export function getById(id) {
    let result = [];
    let sql = 'SELECT id, fullname, email, address, tel FROM users WHERE id = ?';
    let data = [id];
    db.transaction((txn) => {
        txn.executeSql(sql, data, (tx, res) => {
            let len = res.rows.length;
            if (len > 0) {
                result = res.rows.item(0);
            }
        })
    });
    return result;
}

export function insertUser(user = []) {
    if (user.length === 0) {
        return;
    }

    let fullname = user.hasOwnProperty('fullname') ? user.fullname : null;
    let email = user.hasOwnProperty('email') ? user.email : null;
    let address = user.hasOwnProperty('address') ? user.address : null;
    let tel = user.hasOwnProperty('tel') ? user.tel : null;

    let sql = 'INSERT INTO users (fullname, email, address, tel) VALUES (?, ?, ?, ?)';
    let data = [fullname, email, address, tel];
    db.transaction((txn) => {
        txn.executeSql(sql, data);
    });
}

export function updateUser(id, user = []) {
    let update = '';
    if (user.hasOwnProperty('fullname') && user.fullname) {
        update = "fullname = '" + user.fullname + "'";
    }

    if (user.hasOwnProperty('email') && user.email) {
        update += ", email = '" + user.email + "'";
    }

    if (user.hasOwnProperty('address') && user.address) {
        update += ", address = '" + user.address + "'";
    }

    if (user.hasOwnProperty('tel') && user.tel) {
        update += ", tel = '" + user.tel + "'";
    }

    if (!update) {
        return;
    }

    let sql = 'UPDATE users SET ' + update +' WHERE id = ?';
    let data = [id];
    db.transaction((txn) => {
        txn.executeSql(sql, data);
    });
}

export function deleteUser(id) {
    let sql = 'DELETE FROM users WHERE id = ?';
    let data = [id];
    db.transaction((txn) => {
        txn.executeSql(sql, data);
    });
}