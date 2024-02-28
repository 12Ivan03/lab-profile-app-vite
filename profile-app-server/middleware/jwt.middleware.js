const { expressjwt: jwt } = require('express-jwt');

const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: 'payload',
    getToken: getTokenFromHeaders
});

function getTokenFromHeaders (req) {

    if(req.headers.authtokencarier && req.headers.authtokencarier.split(" ")[0] === "Bearer"){
        // console.log("before the token in the if ///req =>", req)
        // console.log("before the token in the if ///req.headers =>", req.headers)
        const token = req.headers.authtokencarier.split(" ")[1];
        // console.log("token ===> ", token)
        return token;
    }

    return null;
}

module.exports = { isAuthenticated }