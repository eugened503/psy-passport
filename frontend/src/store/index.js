/* eslint-disable */ 
import { createStore } from "vuex";

import user from "./user";

const store = {
  modules: {
    user,
  },
  strict: process.env.NODE_ENV !== "production",
};

export default createStore(store);

/* $store.state.products.all
$store.state.cart.all

$store.getters.all 

$store.getters['products/all']
$store.getters['cart/all']

*/
