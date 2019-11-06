export class BSearch {
  private static instance: BSearch;

  private _searchOperations: number = 0;
  private _singleElementOperations: number = 0;

  private constructor() {}

  public static getInstance() {
    if (!BSearch.instance) {
      BSearch.instance = new BSearch();
    }

    return BSearch.instance;
  }

  public search(list: number[], numberToFind: number) {
    this._searchOperations++;

    return this.searchRecursive(list, numberToFind, 0, list.length - 1);
  }

  public searchRecursive(list: number[], numberToFind: number, from: number, to: number): number {
    if (from > to) {
      return -1;
    }

    this._singleElementOperations++;

    const current = Math.floor((to + from) / 2);

    if (list[current] === numberToFind) {
      return current;
    }

    if (list[current] > numberToFind) {
      return this.searchRecursive(list, numberToFind, from, current - 1);
    }

    return this.searchRecursive(list, numberToFind, current + 1, to);
  }

  public clearOperationsCounters() {
    this._searchOperations = 0;
    this._singleElementOperations = 0;
  }

  get searchOperations(): number {
    return this._searchOperations;
  }

  get singleElementOperations(): number {
    return this._singleElementOperations;
  }
}
