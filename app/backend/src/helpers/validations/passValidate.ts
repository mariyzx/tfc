import * as bcrypt from 'bcryptjs';

const passValidate = (passUser: string, passDB: string) => {
  const pass = bcrypt.compareSync(passUser, passDB);

  if (pass) return 'User exist!';

  return null;
};

export default passValidate;
