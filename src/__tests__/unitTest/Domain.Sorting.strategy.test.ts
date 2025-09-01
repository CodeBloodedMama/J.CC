import { stableSort } from "../../domain/sorting/strategy";

describe("stableSort (DSU)", () => {
  it("bevarer oprindelig rækkefølge ved tie", () => {
    const input = [
      { k: 1, label: "a" },
      { k: 1, label: "b" },
      { k: 1, label: "c" },
    ];
    const out = stableSort(input, (a, b) => a.k - b.k);
    expect(out.map((x) => x.label)).toEqual(["a", "b", "c"]);
  });

  it("sorterer korrekt når værdier er forskellige", () => {
    const input = [{ k: 3 }, { k: 1 }, { k: 2 }];
    const out = stableSort(input, (a, b) => a.k - b.k);
    expect(out.map((x) => x.k)).toEqual([1, 2, 3]);
  });
});
