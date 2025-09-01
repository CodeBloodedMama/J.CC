export interface SortStrategy<T> {
  id: string;
  label: string;
  compare(a: T, b: T): number;
}

// stableSort laver en sortering og generer et nyt array hvor hvert eleement får
// sit oprindelig index med.
// Dette gør sorteringen stabil, så elementer der er "ens" ift. sorteringskriteriet
// bevarer deres oprindelige rækkefølge.

export function stableSort<T>(arr: T[], cmp: (a: T, b: T) => number): T[] {
  return arr
    .map((v, i) => ({ v, i }))
    .sort((x, y) => {
      const c = cmp(x.v, y.v);
      return c !== 0 ? c : x.i - y.i;
    })
    .map((x) => x.v);
}
