import { create, NButton, NDialogProvider, NMessageProvider, NConfigProvider } from 'naive-ui';

export const naive = create({
  components: [NButton, NDialogProvider, NMessageProvider, NConfigProvider],
});

export default naive;

export const themeOverrides = {
  common: {
    primaryColor: '#D97706',
  },
  // Button: {
  //   textColor: '#FF0000',
  // },
  // Select: {
  //   peers: {
  //     InternalSelection: {
  //       textColor: '#FF0000',
  //     },
  //   },
  // },
  // ...
};
