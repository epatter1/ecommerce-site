import jwt from 'jsonwebtoken';

{/* get user data and return a token */ }
export const generateToken = (user) => {
  {
    /* sign has 3 params:
        -- user object
        -- JSON web token secrets
        -- options   */
  }
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'secretsauce',
    {
      expiresIn: "30d",
    }
  );
};

{/* defining middleware to get info about user */}
export const isAuth = (req, res, next) => {
  //get auth fields from headers of this request	
  const authorization = req.headers.authorization;	
  if (authorization) {
     {/* starting at 7 indexes in the string to the end */}	
    const token = authorization.slice(7, authorization.length); //Bearer XXXXXX	
    {/* decrypting the token
        -- token
        -- secret
        -- error and decode that contains the data in token */}
    jwt.verify(	
      token,	
      process.env.JWT_SECRET || 'secretsauce',	
      (err, decode) => {	
        if (err) {	
          res.status(401).send({ message: 'Invalid Token' });	
        } else {	
          req.user = decode;
          {/* pass user as property of request to the next middleware */}	
          next();	
        }	
      }	
    );	
  } else {	
    res.status(401).send({ message: 'No Token' });	
  }	
};

