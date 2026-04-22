export type MortgageSimulationInput = {
  principal: number;
  tenorYears: number;
  yearlyInterestRates: number[];
};

export type AmortizationRow = {
  monthNumber: number;
  yearNumber: number;
  annualInterestRate: number;
  monthlyInstallment: number;
  principalPayment: number;
  interestPayment: number;
  remainingPrincipal: number;
};

export type MortgageSimulationResult = {
  totalMonths: number;
  yearlyInterestRates: number[];
  rows: AmortizationRow[];
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function createDefaultYearlyRates(tenorYears: number): number[] {
  return Array.from({ length: tenorYears }, () => 0);
}
