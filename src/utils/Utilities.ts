export const isProductionEnvironment = () => process.env.NODE_ENV === 'production';
export const isDevelopmentEnvironment = () => process.env.NODE_ENV === 'development';
export const isTestingEnvironment = () => process.env.NODE_ENV === 'test';

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
