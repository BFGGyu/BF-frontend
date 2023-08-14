import { randomUUID } from 'crypto';
import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: `isLoggedInState${randomUUID}`,
  default: false
});

export const nicknameState = atom({
  key: `nicknameState${randomUUID}`,
  default: ''
});
