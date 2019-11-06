// Bubble search
export class ASort {
  public sort(list: number[]): number[] {
    const length = list.length;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (list[j] <= list[j + 1]) {
          continue;
        }

        const tmp = list[j + 1];
        list[j + 1] = list[j];
        list[j] = tmp;
      }
    }

    return list;
  }
}
