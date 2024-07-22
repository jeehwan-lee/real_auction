import { atom } from "recoil";
import { User } from "../../models/user";

export const dimmedAtom = atom<Boolean>({
  key: "dimmed",
  default: false,
});
