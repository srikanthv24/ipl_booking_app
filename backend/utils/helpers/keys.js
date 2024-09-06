const generator = (length) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let temp = '';
    for (let i = 0; i <= length; i++) {
        temp += chars[Math.floor(Math.random() * chars.length)];
    }
    return temp;
};

module.exports = {
    uniqId: () => generator(6)
}