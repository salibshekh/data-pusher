const axios = require('axios');

exports.fire = async ({ method = 'post', url, data, headers = {}, timeout = 15000 }) => {
    const cfg = {
        method: method.toLowerCase(),
        url,
        data,
        headers: headers || {},
        timeout
    };
    const resp = await axios(cfg);
    return resp;
};
