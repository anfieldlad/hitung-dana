import { describe, expect, it } from "vitest";

import { simulateMortgage } from "../src/index";

describe("simulateMortgage", () => {
  it("membuat tabel angsuran sesuai tenor", () => {
    const result = simulateMortgage({
      principal: 120_000_000,
      tenorYears: 2,
      yearlyInterestRates: [6, 7]
    });

    expect(result.rows).toHaveLength(24);
    expect(result.rows[0]?.yearNumber).toBe(1);
    expect(result.rows[12]?.yearNumber).toBe(2);
    expect(result.rows[23]?.remainingPrincipal).toBe(0);
  });

  it("mendukung bunga 0 persen", () => {
    const result = simulateMortgage({
      principal: 12_000_000,
      tenorYears: 1,
      yearlyInterestRates: [0]
    });

    expect(result.rows[0]?.monthlyInstallment).toBe(1_000_000);
    expect(result.rows[11]?.remainingPrincipal).toBe(0);
  });
});
