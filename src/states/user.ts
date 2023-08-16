import { atom } from 'recoil';
import { v1 } from 'uuid';

export const isLoggedInState = atom({
  key: `isLoggedInState${v1()}`,
  default: false
});

export const nicknameState = atom({
  key: `nicknameState${v1()}`,
  default: ''
});
