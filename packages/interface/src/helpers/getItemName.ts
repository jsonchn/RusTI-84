import { IItem } from "@rusti-84/data/types";

export const getItemName = (item: IItem) => {
  return `${item.name}${item?.crafts ? ` (x${item.crafts})` : ""}`;
};
