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
