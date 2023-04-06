import * as bcrypt from 'bcrypt';

export const encryptPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (hashedPassword, password): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const getSkipPaginationValue = (page: number, limit: number): number => {
  if (page <= 0) {
    page = 1;
  }

  return page === 1 ? 0 : (page - 1) * limit;
};
