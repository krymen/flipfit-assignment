import { ASort } from '../src/ASort';

describe('ASort (bubble search)', () => {
  const algorithm = new ASort();

  it('sorts a list of numbers in ascending order', () => {
    const unsorted = [13, 2, 17, 5, 77, 22, 83, 65, 14, 9, 0, 4, 7, 32];

    expect(algorithm.sort(unsorted)).toEqual([0, 2, 4, 5, 7, 9, 13, 14, 17, 22, 32, 65, 77, 83]);
  });

  it('returns same list if the given list is empty', () => {
    const emptyList: number[] = [];

    expect(algorithm.sort(emptyList)).toEqual(emptyList);
  });

  it('sorts one element list', () => {
    const oneElement = [13];

    expect(algorithm.sort(oneElement)).toEqual([13]);
  });


  it('sorts a list in place', () => {
    const unsorted = [13, 2, 17, 5, 77, 22, 83, 65, 14, 9, 0, 4, 7, 32];

    expect(algorithm.sort(unsorted)).toBe(unsorted);
  });
});
