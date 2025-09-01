import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("../../services/JsonProductRepository", () => {
  return {
    JsonProductRepository: {
      list: jest.fn(), // <-- vi styrer denne i testen
      get: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
});

import { useProducts } from "../../application/useProducts";
import { JsonProductRepository } from "../../services/JsonProductRepository";
import type { Product } from "../../domain/types";

// 2) Lille probe-komponent til at "læse" hookens state
function Probe() {
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

describe("useProducts integration-light", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("loader, bygger kategorier, reagerer på filtre/sortering", async () => {
    (JsonProductRepository.list as jest.Mock).mockResolvedValueOnce([
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
    ]);

    render(<Probe />);

    expect(screen.getByTestId("state")).toHaveTextContent("loading");

    await waitFor(() => {
      expect(screen.getByTestId("state")).toHaveTextContent("ready");
      expect(screen.getByTestId("count")).toHaveTextContent("3");
      expect(screen.getByTestId("cats")).toHaveTextContent("Dyne,Pude,Sofa"); // alfabetisk
    });

    // Filter
    screen.getByText("set-q").click();
    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("1");
    });

    // Sort (på 1 resultat ændrer det ikke ordren; jeg tjekker blot at state er stabil)
    screen.getByText("set-sort").click();
    expect(screen.getByTestId("state")).toHaveTextContent("ready");
  });
});
