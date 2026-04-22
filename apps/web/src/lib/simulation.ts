import {
  formatCurrency,
  type MortgageSimulationInput,
  type MortgageSimulationResult
} from "@kalkulator-finance/shared";

import type { FormState, SimulationSummary } from "../types";

export function buildInitialFormState(): FormState {
  return {
    downPayment: "",
    principal: "",
    propertyPrice: "",
    tenorYears: "",
    yearlyInterestRates: []
  };
}

export function resizeRates(existingRates: string[], nextTenor: number): string[] {
  const nextRates = [...existingRates];

  if (nextTenor > nextRates.length) {
    const lastValue = nextRates[nextRates.length - 1] ?? "";
    while (nextRates.length < nextTenor) {
      nextRates.push(lastValue);
    }
  } else {
    nextRates.length = nextTenor;
  }

  return nextRates;
}

export function sanitizeNumberInput(value: string): string {
  return value.replace(/[^\d]/g, "");
}

export function formatRupiahInput(value: string): string {
  if (value.trim() === "") {
    return "";
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return value;
  }

  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0
  }).format(numericValue);
}

export function parseFormState(formState: FormState): MortgageSimulationInput {
  const principal = Number(formState.principal);
  const tenorYears = Number(formState.tenorYears);
  const yearlyInterestRates = formState.yearlyInterestRates.map((rate) => Number(rate));

  if (!Number.isFinite(principal) || principal <= 0) {
    throw new Error("Enter a loan amount greater than 0.");
  }

  if (!Number.isInteger(tenorYears) || tenorYears <= 0) {
    throw new Error("Enter a valid loan term in years.");
  }

  if (yearlyInterestRates.length !== tenorYears) {
    throw new Error("Add one interest rate for each year of the loan term.");
  }

  if (yearlyInterestRates.some((rate) => !Number.isFinite(rate) || rate < 0)) {
    throw new Error("Each yearly interest rate must be 0 or higher.");
  }

  return {
    principal,
    tenorYears,
    yearlyInterestRates
  };
}

export function derivePrincipal(formState: FormState): { error: string | null; value: number | null } {
  if (formState.propertyPrice.trim() === "" && formState.downPayment.trim() === "") {
    return { error: null, value: null };
  }

  const propertyPrice = Number(formState.propertyPrice);
  const downPayment = Number(formState.downPayment);

  if (!Number.isFinite(propertyPrice) || propertyPrice <= 0) {
    return { error: "Enter a property price greater than 0.", value: null };
  }

  if (!Number.isFinite(downPayment) || downPayment < 0) {
    return { error: "Down payment must be 0 or higher.", value: null };
  }

  if (downPayment > propertyPrice) {
    return { error: "Down payment cannot be higher than the property price.", value: null };
  }

  return { error: null, value: propertyPrice - downPayment };
}

export function formatDerivedPrincipal(value: number | null): string | null {
  if (value === null) {
    return null;
  }

  return formatCurrency(value);
}

export function buildSummary(result: MortgageSimulationResult): SimulationSummary | null {
  const firstRow = result.rows[0];
  const lastRow = result.rows[result.rows.length - 1];

  if (!firstRow || !lastRow) {
    return null;
  }

  const totalInterest = result.rows.reduce((sum, row) => sum + row.interestPayment, 0);
  const totalPayment = result.rows.reduce((sum, row) => sum + row.monthlyInstallment, 0);

  return {
    totalInterest,
    totalPayment,
    firstInstallment: firstRow.monthlyInstallment,
    lastInstallment: lastRow.monthlyInstallment
  };
}

export function isFormReady(formState: FormState): boolean {
  if (formState.principal.trim() === "" || formState.tenorYears.trim() === "") {
    return false;
  }

  if (!Number.isFinite(Number(formState.principal)) || Number(formState.principal) <= 0) {
    return false;
  }

  if (!Number.isInteger(Number(formState.tenorYears)) || Number(formState.tenorYears) <= 0) {
    return false;
  }

  if (formState.yearlyInterestRates.length !== Number(formState.tenorYears)) {
    return false;
  }

  return formState.yearlyInterestRates.every(
    (rate) => rate.trim() !== "" && Number.isFinite(Number(rate)) && Number(rate) >= 0
  );
}
