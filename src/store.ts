import { reactive } from "vue";

export interface Store {
  debug: boolean;
  state: { userName: null | string };
  setUserName: (newName: string) => void;
}

export const store: Store = {
  debug: true,
  state: reactive({
    userName: "Frank",
  }),
  setUserName: function(newName: string) {
    this.state.userName = newName;
  },
};
