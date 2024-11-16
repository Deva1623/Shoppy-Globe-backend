
import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    // extract  token from the Authorization header, removing the Bearer prefix
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // if no token is provided, deny access
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token found.' });
    }

    try {
        // verify the token using the secret key
        const decoded = jwt.verify(token, 'diwakar');
        
        // attach the decoded user information to the request object
        req.user = decoded;
        
        next();
    } catch (error) {
        // if token verification not pass, return an error
        res.status(400).json({ message: 'Invalid token.' });
    }
};
