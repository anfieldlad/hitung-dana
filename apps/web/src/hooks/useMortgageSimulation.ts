import { useEffect, useMemo, useState } from "react";

import { simulateMortgage } from "@kalkulator-finance/finance-core";
import type { MortgageSimulationResult } from "@kalkulator-finance/shared";

import {
  buildInitialFormState,
  buildSummary,
  formatRupiahInput,
  isFormReady,
  parseFormState,
  resizeRates,
  sanitizeNumberInput
} from "../lib/simulation";
import type { FormState } from "../types";

type UseMortgageSimulationResult = {
  errorMessage: string | null;
  formIsReady: boolean;
  formState: FormState;
  formattedPrincipal: string;
  result: MortgageSimulationResult | null;
  summary: ReturnType<typeof buildSummary>;
  tenorNumber: number;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  updatePrincipal: (value: string) => void;
  updateTenor: (value: string) => void;
  updateYearlyRate: (index: number, value: string) => void;
};

export function useMortgageSimulation(): UseMortgageSimulationResult {
  const [formState, setFormState] = useState<FormState>(buildInitialFormState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<MortgageSimulationResult | null>(null);

  const tenorNumber = useMemo(() => Number(formState.tenorYears) || 0, [formState.tenorYears]);
  const summary = useMemo(() => (result ? buildSummary(result) : null), [result]);
  const formattedPrincipal = useMemo(
    () => formatRupiahInput(formState.principal),
    [formState.principal]
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

  function updatePrincipal(value: string) {
    setFormState((current) => ({
      ...current,
      principal: sanitizeNumberInput(value)
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
      const message = error instanceof Error ? error.message : "Simulasi gagal diproses.";
      setResult(null);
      setErrorMessage(message);
    }
  }

  return {
    errorMessage,
    formIsReady,
    formState,
    formattedPrincipal,
    result,
    summary,
    tenorNumber,
    handleSubmit,
    updatePrincipal,
    updateTenor,
    updateYearlyRate
  };
}
