import { BSearch } from '../src/BSearch';

describe('Binary search', () => {
  const algorithm = new BSearch();
  const elementsToFind = [1, 5, 13, 27, 77];

  it('returns an index of the searched element', () => {
    expect(algorithm.search(elementsToFind, 77)).toEqual(4);
  });

  it('returns -1 if given element cannot be found', () => {
    expect(algorithm.search(elementsToFind, 20)).toEqual(-1);
  });
});
