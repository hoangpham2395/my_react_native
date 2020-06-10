export function isEmail(email) {
    let reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return reg.test(email) === true;
}

export function formatMoney (amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
        if (!amount) {
            return 0;
        }

        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 0 : decimalCount;
        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e);
        return amount;
    }
}

export function formatDate(date = '', y = "YYYY-MM-DD HH:ii:ss", isGetCurrent = false) {
    try {
        if (date === undefined || !date) {
            if (!isGetCurrent) {
                return '';
            } else {
                date = new Date();
            }
        }

        if (!isGetCurrent) {
            date = date.split('-').join('/');
            date = new Date(date);
        }

        let z = {
            M: date.getMonth() + 1,
            D: date.getDate(),
            H: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds()
        };
        y = y.replace(/(M+|D+|H+|i+|s+)/g, function (v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
        });

        return y.replace(/(Y+)/g, function (v) {
            return date.getFullYear().toString().slice(-v.length)
        });
    } catch (e) {
        console.error(e);
    }
}

export function getCurrentYear() {
    return new Date().getFullYear();
}

export function getCurrentMonth(isFull = false) {
    let month = new Date().getMonth() + 1;
    if (!isFull) {
        return month;
    }

    return month > 9 ? month : ('0' + month);
}