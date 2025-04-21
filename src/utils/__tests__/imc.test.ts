import { calculateIMC, getAverageIMC } from '../../../src/utils/imc';

describe('IMC Utility Functions', () => {
  describe('calculateIMC', () => {
    it('should correctly calculate the IMC (BMI)', () => {
      const weight = 70000;
      const height = 175;

      const imc = calculateIMC(weight, height);

      expect(imc).toBeCloseTo(22.86, 2);
    });
  });

  describe('getAverageIMC', () => {
    it('should correctly calculate the average IMC', () => {
      const imcs = [22.86, 24.5, 21.3];

      const averageIMC = getAverageIMC(imcs);

      expect(averageIMC).toBeCloseTo(22.89, 2);
    });
  });
});
