/**
 * Circular Impact Engine
 * Calculates the environmental impact of a product purchase based on circular economy principles.
 */

interface ImpactCalculationParams {
  weightGram: number;
  fishByProductPercent: number; // percentage (0-100)
  yieldConversion: number; // e.g., 1.0
  baseImpactScore: number;
}

interface ImpactResult {
  fishByProductsUsedGram: number;
  estimatedWasteDivertedGram: number;
  circularImpactScore: number;
}

export function calculateCircularImpact(params: ImpactCalculationParams): ImpactResult {
  const {
    weightGram,
    fishByProductPercent,
    yieldConversion,
    baseImpactScore,
  } = params;

  // Calculate grams of fish by-products used in the product
  const fishByProductsUsedGram = weightGram * (fishByProductPercent / 100);

  // Apply yield conversion to find out how much raw waste was diverted to create this amount
  // E.g., if yield is 1.0, 1g of waste creates 1g of by-product ingredient. 
  // If yield is 0.5 (takes 2g of raw waste to make 1g of dried ingredient), 
  // then diverted = used / 0.5.
  // Assuming the engine image shows 210g used = 210g diverted, yield is 1.0 here.
  const estimatedWasteDivertedGram = fishByProductsUsedGram / yieldConversion;

  // The base score could be augmented by volume. 
  // For demonstration, we cap it at 10 and add small bonuses for larger diversions.
  let circularImpactScore = baseImpactScore;
  if (estimatedWasteDivertedGram > 500) {
    circularImpactScore += 0.5;
  } else if (estimatedWasteDivertedGram > 200) {
    circularImpactScore += 0.2;
  }
  
  // Cap at 10.0
  circularImpactScore = Math.min(10.0, circularImpactScore);

  return {
    fishByProductsUsedGram: Number(fishByProductsUsedGram.toFixed(1)),
    estimatedWasteDivertedGram: Number(estimatedWasteDivertedGram.toFixed(1)),
    circularImpactScore: Number(circularImpactScore.toFixed(1)),
  };
}
