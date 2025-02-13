import bcrypt from 'bcrypt';

const bcryptHandler = {
  async hashedPassword(password: string, salt: number) {
    return await bcrypt.hash(password, salt);
  },
  async comparePassword(password: string, encrypted: string) {
    return await bcrypt.compare(password, encrypted);
  },
};
export default bcryptHandler;
