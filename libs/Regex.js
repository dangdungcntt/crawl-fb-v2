const phone = new RegExp(/\d{9,11}/);
const email = new RegExp(/[^\s]+@[^\s]+(?:\.[^\s]+)+/);

module.exports = {
    getPhone(str) {
        let res = phone.exec(str);

        return res ? res[0] : null;
    },

    getEmail(str) {
        let res = email.exec(str);

        return res ? res[0] : null;
    }
}