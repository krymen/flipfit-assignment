export class BSearch {
  public search(list: number[], numberToFind: number, from = 0, to = list.length): number {
    if (from > to) {
      return -1;
    }

    const current = Math.floor((to + from) / 2);

    if (list[current] == numberToFind) {
      return current;
    }

    if (list[current] > numberToFind) {
      return this.search(list, numberToFind, from, current - 1);
    }

    return this.search(list, numberToFind, current + 1, to);
  }
}
