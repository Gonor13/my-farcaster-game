// Eldritch Text and Symbol Generator
export const eldritchPhrases = [
  'Ia! Ia! Cthulhu fhtagn!',
  'Ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn',
  'That is not dead which can eternal lie',
  'In strange aeons even death may die',
  'The Old Ones were, the Old Ones are, and the Old Ones shall be',
  'The stars are right',
  'Beyond the pillars of eternity',
];

export const eldritchNames = [
  'Cthulhu',
  'Azathoth',
  'Yog-Sothoth',
  'Nyarlathotep',
  'Shub-Niggurath',
  'Hastur',
  'Dagon',
];

export function getRandomEldritchPhrase(): string {
  return eldritchPhrases[Math.floor(Math.random() * eldritchPhrases.length)];
}

export function getRandomEldritchName(): string {
  return eldritchNames[Math.floor(Math.random() * eldritchNames.length)];
}

export function generateEldritchText(text: string, corruption: number): string {
  // Corrupt text based on sanity level
  if (corruption < 0.3) return text;
  
  let corrupted = text;
  const chars = ['', '~', '≈', '∿', '≋'];
  
  // Add corruption characters
  for (let i = 0; i < Math.floor(text.length * corruption * 0.3); i++) {
    const pos = Math.floor(Math.random() * corrupted.length);
    const char = chars[Math.floor(Math.random() * chars.length)];
    corrupted = corrupted.slice(0, pos) + char + corrupted.slice(pos);
  }
  
  return corrupted;
}

export function getDeathAnimationSymbols(): Array<{ symbol: string; x: number; y: number; opacity: number }> {
  const symbols = ['༒', '࿓', 'ꙮ', '☠', '⚰', '☣'];
  const result: Array<{ symbol: string; x: number; y: number; opacity: number }> = [];
  
  for (let i = 0; i < 20; i++) {
    result.push({
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.5,
    });
  }
  
  return result;
}
