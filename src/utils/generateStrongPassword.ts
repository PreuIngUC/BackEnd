import { randomBytes } from 'crypto'

function generateStrongPassword(): string {
  return randomBytes(32).toString('base64url')
}

export default generateStrongPassword
