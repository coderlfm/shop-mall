const TIME_OUT = 10000;
const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://101.35.200.60:8000/api' : 'http://101.35.200.60:8000/api';

export { BASE_URL, TIME_OUT };
