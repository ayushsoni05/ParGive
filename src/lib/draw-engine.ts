/**
 * ParGive Draw Engine
 * Handles random generation, match calculations, and prize distributions.
 */

export type MatchResult = {
  tier: 5 | 4 | 3 | 0;
  matchingNumbers: number[];
};

/**
 * Calculates how many numbers match between user scores and draw numbers.
 */
export function calculateMatch(userScores: number[], drawNumbers: number[]): MatchResult {
  const matchingNumbers = userScores.filter(score => drawNumbers.includes(score));
  const count = matchingNumbers.length;
  
  let tier: 5 | 4 | 3 | 0 = 0;
  if (count >= 5) tier = 5;
  else if (count === 4) tier = 4;
  else if (count === 3) tier = 3;
  
  return { tier, matchingNumbers };
}

/**
 * Generates draw numbers based on different logic options.
 */
export function generateDrawNumbers(type: 'random' | 'least-frequent' | 'most-frequent', allUserScores: number[]): number[] {
  if (type === 'random' || allUserScores.length === 0) {
    const numbers: number[] = [];
    while (numbers.length < 5) {
      const n = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(n)) numbers.push(n);
    }
    return numbers.sort((a, b) => a - b);
  }

  // Frequency analysis
  const frequencyMap: Record<number, number> = {};
  allUserScores.forEach(s => {
    frequencyMap[s] = (frequencyMap[s] || 0) + 1;
  });

  const sortedNums = Object.keys(frequencyMap)
    .map(Number)
    .sort((a, b) => {
      const freqA = frequencyMap[a];
      const freqB = frequencyMap[b];
      return type === 'least-frequent' ? freqA - freqB : freqB - freqA;
    });

  // Take top 5 or fill with random if not enough
  const result = sortedNums.slice(0, 5);
  while (result.length < 5) {
    const n = Math.floor(Math.random() * 45) + 1;
    if (!result.includes(n)) result.push(n);
  }
  
  return result.sort((a, b) => a - b);
}

/**
 * Calculates prize distribution based on total pool and winner counts.
 */
export function calculatePrizes(totalPool: number, counts: { '5': number, '4': number, '3': number }) {
  const share5 = 0.40;
  const share4 = 0.35;
  const share3 = 0.25;

  return {
    tier5: counts['5'] > 0 ? (totalPool * share5) / counts['5'] : totalPool * share5, // If 0 winners, it rolls over
    tier4: counts['4'] > 0 ? (totalPool * share4) / counts['4'] : 0,
    tier3: counts['3'] > 0 ? (totalPool * share3) / counts['3'] : 0,
    isRollover: counts['5'] === 0
  };
}
