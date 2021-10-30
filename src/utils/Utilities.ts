export const isProductionEnvironment = () => process.env.NODE_ENV === 'production';
export const isDevelopmentEnvironment = () => process.env.NODE_ENV === 'development';
export const isTestingEnvironment = () => process.env.NODE_ENV === 'test';

/** Gets a random number between min and max
 * @param min the lowest number that can be generated
 * @param max the highest number that can be generated
 */
export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
