export function calculateIMC(weight: number, height: number): number {
  const heightInMeters = height / 100; // Convert height from cm to m
  const weightInKilograms = weight / 1000; // Convert weight from g to kg
  return weightInKilograms / (heightInMeters * heightInMeters);
}

export function getAverageIMC(imcs: number[]): number {
  return imcs.reduce((a, b) => a + b, 0) / imcs.length;
}
