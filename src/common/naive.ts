import {
  create,
  NButton,
  NDialogProvider,
  GlobalThemeOverrides,
  NMessageProvider,
  NConfigProvider,
  NDataTable,
  NTable,
  NCheckbox,
} from 'naive-ui';

export const naive = create({
  components: [NButton, NDialogProvider, NMessageProvider, NConfigProvider, NDataTable, NTable, NCheckbox],
});

export default naive;

export const themeOverrides = {
  common: {
    primaryColor: '#D97706',
  },
  Button: {
    // textColor: '#FF0000',
    // colorHover: '#D97706',
    // colorHover: '#D97706',
    textColorHover: '#D97706',
    textColorPressed: '#D97706',
    textColorFocus: '#D97706',
    borderHover: '1px solid #D97706',
    borderPressed: '1px solid #D97706',
    borderFocus: '1px solid #D97706',
  },
  // Select: {
  //   peers: {
  //     InternalSelection: {
  //       textColor: '#FF0000',
  //     },
  //   },
  // },
  // ...
};
