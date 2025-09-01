import { SelectedItem } from "@rusti-84/context/types";

export const getSelectedCount = (selected: Array<SelectedItem>) => {
  return selected.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
};
