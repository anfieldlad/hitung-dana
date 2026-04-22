import { useEffect, useMemo, useState } from "react";

import { simulateMortgage } from "@kalkulator-finance/finance-core";
import type { MortgageSimulationResult } from "@kalkulator-finance/shared";

import {
  buildInitialFormState,
  buildSummary,
  derivePrincipal,
  formatDerivedPrincipal,
  formatRupiahInput,
  isFormReady,
  parseFormState,
  resizeRates,
  sanitizeNumberInput
} from "../lib/simulation";
import type { FormState } from "../types";

type UseMortgageSimulationResult = {
  applyCalculatedPrincipal: () => void;
  derivedPrincipalError: string | null;
  formIsReady: boolean;
  formState: FormState;
  formattedCalculatedPrincipal: string | null;
  formattedDownPayment: string;
  formattedPrincipal: string;
  formattedPropertyPrice: string;
  errorMessage: string | null;
  result: MortgageSimulationResult | null;
  summary: ReturnType<typeof buildSummary>;
  tenorNumber: number;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  updateDownPayment: (value: string) => void;
  updatePrincipal: (value: string) => void;
  updatePropertyPrice: (value: string) => void;
  updateTenor: (value: string) => void;
  updateYearlyRate: (index: number, value: string) => void;
};

export function useMortgageSimulation(): UseMortgageSimulationResult {
  const [formState, setFormState] = useState<FormState>(buildInitialFormState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<MortgageSimulationResult | null>(null);

  const tenorNumber = useMemo(() => Number(formState.tenorYears) || 0, [formState.tenorYears]);
  const summary = useMemo(() => (result ? buildSummary(result) : null), [result]);
  const derivedPrincipal = useMemo(() => derivePrincipal(formState), [formState]);

  const formattedCalculatedPrincipal = useMemo(
    () => formatDerivedPrincipal(derivedPrincipal.value),
    [derivedPrincipal.value]
  );
  const formattedDownPayment = useMemo(
    () => formatRupiahInput(formState.downPayment),
    [formState.downPayment]
  );
  const formattedPrincipal = useMemo(
    () => formatRupiahInput(formState.principal),
    [formState.principal]
  );
  const formattedPropertyPrice = useMemo(
    () => formatRupiahInput(formState.propertyPrice),
    [formState.propertyPrice]
  );
  const formIsReady = useMemo(() => isFormReady(formState), [formState]);

  useEffect(() => {
    if (!Number.isInteger(tenorNumber) || tenorNumber <= 0) {
      return;
    }

    setFormState((current) => {
      if (current.yearlyInterestRates.length === tenorNumber) {
        return current;
      }

      return {
        ...current,
        yearlyInterestRates: resizeRates(current.yearlyInterestRates, tenorNumber)
      };
    });
  }, [tenorNumber]);

  function updateDownPayment(value: string) {
    setFormState((current) => ({
      ...current,
      downPayment: sanitizeNumberInput(value)
    }));
  }

  function updatePrincipal(value: string) {
    setFormState((current) => ({
      ...current,
      principal: sanitizeNumberInput(value)
    }));
  }

  function updatePropertyPrice(value: string) {
    setFormState((current) => ({
      ...current,
      propertyPrice: sanitizeNumberInput(value)
    }));
  }

  function updateTenor(value: string) {
    setFormState((current) => ({
      ...current,
      tenorYears: value
    }));
  }

  function updateYearlyRate(index: number, value: string) {
    setFormState((current) => {
      const nextRates = [...current.yearlyInterestRates];
      nextRates[index] = value;

      return {
        ...current,
        yearlyInterestRates: nextRates
      };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const parsedInput = parseFormState(formState);
      setResult(simulateMortgage(parsedInput));
      setErrorMessage(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "We couldn't create the payment table.";
      setResult(null);
      setErrorMessage(message);
    }
  }

  function applyCalculatedPrincipal() {
    if (derivedPrincipal.value === null) {
      return;
    }

    setFormState((current) => ({
      ...current,
      principal: String(derivedPrincipal.value)
    }));
  }

  return {
    applyCalculatedPrincipal,
    derivedPrincipalError: derivedPrincipal.error,
    formIsReady,
    formState,
    formattedCalculatedPrincipal,
    formattedDownPayment,
    formattedPrincipal,
    formattedPropertyPrice,
    errorMessage,
    result,
    summary,
    tenorNumber,
    handleSubmit,
    updateDownPayment,
    updatePrincipal,
    updatePropertyPrice,
    updateTenor,
    updateYearlyRate
  };
}
