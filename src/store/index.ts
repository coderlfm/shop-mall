import { createStore } from 'vuex';
import { IRootStore } from './type';
import { getUserInfoApi, getUserAddressApi } from '@/service';

const store = createStore<IRootStore>({
  state: {
    userInfo: null,
    userAddress: null,
  },
  mutations: {
    changeUserInfo(state, payload: any) {
      state.userInfo = payload;
    },
    changeUserAddress(state, payload: any) {
      state.userAddress = payload;
    },
  },
  actions: {
    async changeUserInfoAction({ commit }) {
      const { data } = await getUserInfoApi();
      commit('changeUserInfo', data);
      return Promise.resolve();
    },
    async changeUserAddressAction({ commit }) {
      const { data } = await getUserAddressApi();
      commit('changeUserAddress', data);
      return Promise.resolve();
    },
  },
  modules: {},
});

export const setupStore = async () => {
  if (!localStorage.getItem('token')) return;
  await store.dispatch('changeUserInfoAction');
  await store.dispatch('changeUserAddressAction');
};

export default store;
