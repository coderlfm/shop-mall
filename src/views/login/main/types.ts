export type FormItemType = { [naem: string]: string };

export type loginFormType = FormItemType[];
export type registerFormType = FormItemType[];
export type formListType = loginFormType | registerFormType;
// { username: string; password: string; repeatPassword: string; nickName: string }
