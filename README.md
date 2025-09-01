# Code Challenge – React + TypeScript

Denne løsning er en **Single Page Application (SPA)** i React + TypeScript, der viser og interagerer med en liste af produkter.  
Den demonstrerer **arkitektur, designprincipper og bedste praksis** med fokus på kvalitet, vedligeholdelse og skalerbarhed.

---

## 🎯 Features

- Produkter indlæses fra `public/products.json` (JYSK-lignende møbel- og boligvarer).
- Liste + detaljevisning af produkter.
- **Søgning + filtrering** (kategori, pris min–max, kun på lager).
- **Strategy-baseret sortering** (pris ↑/↓, nyeste/ældste, navn A→Å/Å→A, rating).
- **Factory Method** sikrer konsistente domæneobjekter (normalisering/validering).
- **Separat .css** styling pr. komponent, responsivt grid, mobil-først.
- CRUD-design via et repository-interface (C/U/D simuleret i localStorage).

---

## 🏗 Arkitektur

### Tre-lags struktur

1. **Presentation (UI)**
   - Komponenter: `ProductListPage`, `ProductDetailPage`, `ProductCard`, `Toolbar`.
   - Ansvar: viser data og udsender events.
   - CSS i egne `.css` filer, responsivt layout og a11y.

2. **Application (use case)**
   - `useProducts` hook: indlæser produkter, holder state (søgeord, filtre, sortering), håndterer UI-tilstande (_Loading/Ready/Empty/Error_).
   - Orkestrerer flow uden at kende implementeringen af datalaget.

3. **Data Access (Repository)**
   - `ProductRepository` interface (Query/Command).
   - `JsonProductRepository` implementering → læser `products.json` og simulerer CRUD via localStorage.
   - Let at udskifte til REST/Firebase senere.

---

## ⚙️ Designprincipper

### SOLID

- **S**: UI viser, Application orkestrerer, Repository henter, Domain bestemmer regler.
- **O**: Nye sorteringer/filtre tilføjes som strategier/specs uden at ændre eksisterende kode.
- **L**: Repository-implementeringer kan udskiftes uden at ændre Application/UI.
- **I**: Interface Segregation → Query og Command adskilt.
- **D**: Application afhænger af abstraktioner (repo, strategier), ikke `fetch`.

### GoF Patterns

- **Factory Method** → `makeProduct` sikrer validerede, konsistente `Product` objekter.
- **Strategy** → `productSortStrategies` + `stableSort` giver fleksibel, stabil sortering.
- **State (konceptuelt)** → UI-tilstande _Loading/Ready/Empty/Error_.

---

## ✅ Valg

- **React + TypeScript** → krav og god type-sikkerhed.
- **Tre-lags SPA** → lav kobling, høj samhørighed, let at teste.
- **Strategy til sortering** → OCP, stabilitet og udvidelsesmuligheder.
- **Factory Method** → data altid konsistente (pris ≥ 0, rating clamp, parse dato).
- **.css pr. komponent** → enkelt, responsivt, uden at trække store styling-frameworks ind.
- **Local state (ingen URL-sync)** → simpelt design, godt til code challenge scope.
- **CRUD-interface** selvom casen kun kræver read → viser design for skalering.

---

## 🚫 Fravalg

- **Ingen global state manager (Redux/Zustand/Context)** → unødigt tungt til lille case.
- **Ingen URL-sync** → lavere kompleksitet; trade-off: man kan ikke dele filtre via link.
- **Ingen SSR (Next.js)** → overkill til 3–4 timers SPA og uden for boundary af krav
- **Ingen styling frameworks (Tailwind, MUI)** → holder løsningen ren, fokus på arkitektur.

---

## 📈 Robusthed, performance & skalering

- **Robusthed** → Factory validerer data, UI håndterer tom-/fejltilstande.
- **Performance** → Debounce på søgning, memoiseret filtrering/sortering, stabil sort.
- **Skalering** → Let at skifte datakilde (REST/Firebase) eller flytte sort/filtre server-side.
- **Tilgængelighed** → kontrast, `:focus-visible`, labels/aria, tastaturnavigation.

---

## ⚠️ Pitfalls & løsninger

- **Ustabil sortering** → løst med `stableSort` (DSU).
- **Inkonsekvent JSON** → løst med `makeProduct` normalisering.
- **God-komponenter** → undgået ved at lade UI være “dumt” og logik i Application.
- **Interface-bloat** → delt repo i Query/Command.
- **Manglende UI-tilstande** → Loading/Empty/Error altid synlige.

---

## 🚀 Kørsel

```bash
npm install
npm run start
# åbner på port 5173 http://localhost:5173
---




```
