import { BSearch } from '../src/BSearch';

describe('Binary search', () => {
  let algorithm: BSearch;
  const elementsToFind = [1, 5, 13, 27, 77];

  beforeEach(() => {
    algorithm = BSearch.getInstance();

    algorithm.clearOperationsCounters();
  });

  it('returns an index of the searched element', () => {
    expect(algorithm.search(elementsToFind, 77)).toEqual(4);
  });

  it('returns -1 if given element cannot be found', () => {
    expect(algorithm.search(elementsToFind, 20)).toEqual(-1);
  });

  it('counts number of search operations', () => {
    algorithm.search(elementsToFind, 77);
    algorithm.search(elementsToFind, 20);
    algorithm.search(elementsToFind, 5);

    expect(algorithm.searchOperations).toEqual(3);
  });

  it('counts number of single element operations', () => {
    algorithm.search(elementsToFind, 27);

    expect(algorithm.singleElementOperations).toEqual(2);
  });

  it('a singleton', () => {
    expect(algorithm).toBe(BSearch.getInstance());
  });
});
