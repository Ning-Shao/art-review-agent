export const monetThumbnails = [
  {
    title: 'Women in the Garden',
    url: 'https://uploads3.wikiart.org/00475/images/claude-monet/rf-2773.jpg!Large.jpg',
  },
  {
    title: 'Impression, Sunrise',
    url: 'https://uploads0.wikiart.org/00129/images/claude-monet/impression-sunrise.jpg!Large.jpg',
  },
  {
    title: 'Autumn on the Seine at Argenteuil',
    url: 'https://uploads8.wikiart.org/images/claude-monet/autumn-on-the-seine-at-argenteuil.jpg!Large.jpg',
  },
  {
    title: 'Haystacks at Giverny',
    url: 'https://uploads4.wikiart.org/images/claude-monet/haystacks-at-giverny.jpg!Large.jpg',
  },
  {
    title: 'Haystack at Giverny',
    url: 'https://uploads3.wikiart.org/images/claude-monet/haystack-at-giverny.jpg!Large.jpg',
  },
  {
    title: 'Poplars at Giverny',
    url: 'https://uploads2.wikiart.org/images/claude-monet/poplars-at-giverny.jpg!Large.jpg',
  },
  {
    title: 'Antibes in the Morning',
    url: 'https://uploads0.wikiart.org/images/claude-monet/antibes-in-the-morning(1).jpg!Large.jpg',
  },
  {
    title: 'Three Trees in Grey Weather',
    url: 'https://uploads2.wikiart.org/images/claude-monet/three-trees-in-grey-weather.jpg!Large.jpg',
  },
  {
    title: 'Waterloo Bridge, London',
    url: 'https://uploads6.wikiart.org/images/claude-monet/waterloo-bridge-london.jpg!Large.jpg',
  },
  {
    title: 'Houses of Parliament',
    url: 'https://uploads4.wikiart.org/images/claude-monet/houses-of-parliament.jpg!Large.jpg',
  },
  {
    title: 'Water Lily Pond',
    url: 'https://uploads1.wikiart.org/images/claude-monet/water-lily-pond-1.jpg!Large.jpg',
  },
  {
    title: 'Water Lilies',
    url: 'https://uploads3.wikiart.org/images/claude-monet/water-lilies-1919-9.jpg!Large.jpg',
  },
];

export function getRandomMonetThumbnail() {
  return monetThumbnails[Math.floor(Math.random() * monetThumbnails.length)];
}

export function getRandomMonetThumbnails(count) {
  return monetThumbnails
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, count)
    .map(({ item }) => item);
}
