const jwt= require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log('everything good');
    const accessToken = req.headers['logintoken'];
    console.log(accessToken);
    console.log(req.headers);

    if (accessToken === null) {
        return res.status(401).json({ error: "User not authenticated!"});
    }
    
    try {
        console.log('we actually didnt reach here!')
        const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
        if (decoded) {
            req.authenticated = true;
            req.userData = decoded
            return next();
        } else {
            return res.status(401).json({ error: "User not authenticated!"});
            //req.authenticated = false;
        }
    } catch (err) {
        return res.status(401).json({error: "User not authenticated!"});
    }

};