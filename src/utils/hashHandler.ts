import bcrypt from 'bcrypt';

const hashHandler = async (password: string, salt: number) => {
  return await bcrypt.hash(password, salt);
};
export default hashHandler;
