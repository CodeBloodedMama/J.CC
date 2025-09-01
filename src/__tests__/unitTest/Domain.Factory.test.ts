import { makeProduct } from "../../domain/factory";

// test for stabil sort

describe("Factory Method: makeProduct", () => {
  it("sætter defaults og normaliserer værdier", () => {
    const p = makeProduct({
      id: "x1",
      name: "Test",
      price: -10,
      stock: -5,
      rating: 7.2,
      createdAt: "not-a-date",
      category: "Ukendt",
    });

    expect(p.id).toBe("x1");
    expect(p.name).toBe("Test");
    expect(p.price).toBe(0);
    expect(p.stock).toBe(0);
    expect(p.rating).toBe(5);
    expect(() => new Date(p.createdAt).toISOString()).not.toThrow();
    expect(p.currency).toBe<"DKK">("DKK");
    expect(p.category).toBe("Other");
  });

  it("bevarer kendte kategorier", () => {
    const p = makeProduct({
      name: "Sofa",
      category: "Sofa",
      price: 100,
      stock: 1,
      createdAt: "2025-01-01",
    });
    expect(p.category).toBe("Sofa");
  });

  it("normaliserer arrayfelter", () => {
    const p = makeProduct({
      name: "Dyne",
      price: 100,
      stock: 1,
      createdAt: "2025-01-01",
      material: "Bomuld",
      color: "Hvid",
      certifications: ["OEKO-TEX"],
    });
    expect(p.material).toEqual(["Bomuld"]);
    expect(p.color).toEqual(["Hvid"]);
    expect(p.certifications).toEqual(["OEKO-TEX"]);
  });
});
