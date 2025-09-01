import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useProducts } from "../../application/useProducts";
import * as Repo from "../../services/JsonProductRepository";
import type { Product } from "../../domain/types";

function HookProbe() {
  const { state, products, categories, setFilters, setSortKey } = useProducts();
  return (
    <div>
      <div data-testid="state">{state.type}</div>
      <div data-testid="count">{products.length}</div>
      <div data-testid="cats">{categories.join(",")}</div>
      <button onClick={() => setFilters({ q: "Dyne" })}>set-q</button>
      <button onClick={() => setSortKey("priceDesc")}>set-sort</button>
    </div>
  );
}

const mk = (over: Partial<Product>): Product => ({
  id: "id",
  name: "Item",
  sku: "SKU",
  category: "Sofa",
  price: 0,
  currency: "DKK",
  stock: 1,
  createdAt: "2025-01-01",
  ...over,
});

describe("useProducts (integration light)", () => {
  it("loader data, bygger kategorier og reagerer på filtre/sortering", async () => {
    const list: Product[] = [
      mk({
        id: "a",
        name: "Sofa",
        category: "Sofa",
        price: 1000,
        createdAt: "2025-01-02",
      }),
      mk({
        id: "b",
        name: "Dyne",
        category: "Dyne",
        price: 199,
        createdAt: "2025-01-03",
      }),
      mk({
        id: "c",
        name: "Pude",
        category: "Pude",
        price: 129,
        createdAt: "2025-01-01",
      }),
    ];
    jest.spyOn(Repo.JsonProductRepository, "list").mockResolvedValueOnce(list);

    render(<HookProbe />);

    expect(screen.getByTestId("state").textContent).toBe("loading");

    await waitFor(() => {
      expect(screen.getByTestId("state").textContent).toBe("ready");
      expect(screen.getByTestId("count").textContent).toBe("3");
      expect(screen.getByTestId("cats").textContent).toBe("Dyne,Pude,Sofa");
    });

    screen.getByText("set-q").click();
    await waitFor(() => {
      expect(screen.getByTestId("count").textContent).toBe("1");
    });

    screen.getByText("set-sort").click();
    expect(screen.getByTestId("state")).toHaveTextContent("ready");
  });
});
