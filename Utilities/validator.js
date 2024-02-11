exports.validateName = function (name) {
    if (name.trim().length > 0) {
        return true;
    } else {
        return false;
    }
}