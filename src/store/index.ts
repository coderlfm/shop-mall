import { createStore } from 'vuex';
import { IRootStore } from './type';
import { getUserInfoApi } from '@/service';

export default createStore<IRootStore>({
  state: {
    userInfo: {},
    userAddress: {},
  },
  mutations: {
    changeUserInfo(state, payload: any) {
      state.userInfo = payload;
    },
  },
  actions: {
    async changeUserInfoAction({ commit }) {
      const { data } = await getUserInfoApi();
      commit('changeUserInfo', data);
      return Promise.resolve();
    },
  },
  modules: {},
});
