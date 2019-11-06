export class BSort {
  public sort(list: number[]): number[] {
    if (list.length === 0) {
      return [];
    }

    const [head, ...tail] = list;

    const left = tail.filter(item => item <= head);
    const right = tail.filter(item => item > head);

    return [...this.sort(left), head, ...this.sort(right)];
  }
}
