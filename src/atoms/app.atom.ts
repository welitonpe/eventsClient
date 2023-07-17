import { atom } from "jotai";

export const myUser = {
  name: atom<string>(""),
  familyName: atom<string>(""),
  email: atom<string>(""),
  image: atom<string>(""),
};

export const authenticated = atom<boolean>(false);
