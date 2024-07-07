import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
