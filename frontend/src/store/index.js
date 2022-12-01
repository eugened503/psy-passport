import { createStore } from "vuex";
import user from "./user";
import results from "./results";

const store = {
  modules: {
    user,
    results,
  },
  strict: process.env.NODE_ENV !== "production",
};

export default createStore(store);
