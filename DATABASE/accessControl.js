const config = require('../config');

function checkAccess(senderNumber, isGroup) {
    const isOwner = senderNumber === config.OWNER_NUMBER;

    switch (config.mode) {
        case "private":
            return isOwner;
        case "public":
            return true;
        case "inbox":
            return isOwner || !isGroup;
        case "groups":
            return isOwner || isGroup;
        default:
            return isOwner;
    }
}

module.exports = checkAccess;
