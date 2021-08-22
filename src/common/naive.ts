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
  NCard,
  NTabs,
  NTabPane,
  NModal,
  NRadioGroup,
  NRadioButton,
} from 'naive-ui';

export const naive = create({
  components: [
    NButton,
    NDialogProvider,
    NMessageProvider,
    NConfigProvider,
    NDataTable,
    NTable,
    NCheckbox,
    NCard,
    NTabs,
    NTabPane,
    NModal,
    NRadioGroup,
    NRadioButton,
  ],
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
    // color: '#D97706',
    textColorHover: '#D97706',
    textColorPressed: '#D97706',
    textColorFocus: '#D97706',
    // colorHoverInfo: '#D97706',
    textColorTextHoverInfo: '#D97706',
    colorHoverPrimary: '#D97706',
    borderHoverPrimary: '#D97706',
    colorPressedPrimary: '#D97706',
    borderPressedPrimary: '#D97706',
    borderFocusPrimary: '#D97706',
    colorFocusPrimary: '#D97706',

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
