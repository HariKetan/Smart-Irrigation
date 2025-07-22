import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "7b155543c084b35567f0d8a0c2be06f3cdc628526d46520c46137c15c366ff6c"

export const signToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Invalid token')
  }
} 