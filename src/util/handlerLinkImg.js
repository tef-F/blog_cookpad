module.exports = {
    imgUrlToPath: (url, filename) => {
        var newUrl = url.split('public');
        var rs = `http://192.168.1.5:3000${newUrl[1]}/${filename}`;
        return rs;
    },
};
