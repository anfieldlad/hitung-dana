import type {
  AmortizationRow,
  MortgageSimulationInput,
  MortgageSimulationResult
} from "@kalkulator-finance/shared";

const MONTHS_PER_YEAR = 12;

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function validateInput(input: MortgageSimulationInput): void {
  if (!Number.isFinite(input.principal) || input.principal <= 0) {
    throw new Error("Hutang pokok harus lebih besar dari 0.");
  }

  if (!Number.isInteger(input.tenorYears) || input.tenorYears <= 0) {
    throw new Error("Tenor harus berupa jumlah tahun yang valid.");
  }

  if (input.yearlyInterestRates.length !== input.tenorYears) {
    throw new Error("Jumlah bunga tahunan harus sama dengan jumlah tenor tahun.");
  }

  if (input.yearlyInterestRates.some((rate) => !Number.isFinite(rate) || rate < 0)) {
    throw new Error("Bunga tahunan harus berupa angka 0 atau lebih.");
  }
}

function calculateMonthlyInstallment(
  remainingPrincipal: number,
  annualInterestRate: number,
  remainingMonths: number
): number {
  if (remainingMonths <= 0) {
    return 0;
  }

  const monthlyRate = annualInterestRate / 100 / MONTHS_PER_YEAR;

  if (monthlyRate === 0) {
    return roundCurrency(remainingPrincipal / remainingMonths);
  }

  const factor = Math.pow(1 + monthlyRate, remainingMonths);
  return roundCurrency((remainingPrincipal * monthlyRate * factor) / (factor - 1));
}

export function simulateMortgage(input: MortgageSimulationInput): MortgageSimulationResult {
  validateInput(input);

  const totalMonths = input.tenorYears * MONTHS_PER_YEAR;
  let remainingPrincipal = input.principal;
  let monthNumber = 1;
  const rows: AmortizationRow[] = [];

  for (let yearIndex = 0; yearIndex < input.tenorYears; yearIndex += 1) {
    const annualInterestRate = input.yearlyInterestRates[yearIndex];
    const monthlyRate = annualInterestRate / 100 / MONTHS_PER_YEAR;
    const remainingMonths = totalMonths - monthNumber + 1;
    const installment = calculateMonthlyInstallment(
      remainingPrincipal,
      annualInterestRate,
      remainingMonths
    );
    const monthsInThisYear = Math.min(MONTHS_PER_YEAR, totalMonths - monthNumber + 1);

    for (let monthOffset = 0; monthOffset < monthsInThisYear; monthOffset += 1) {
      const interestPayment = roundCurrency(remainingPrincipal * monthlyRate);
      const rawPrincipalPayment = installment - interestPayment;
      const principalPayment =
        monthNumber === totalMonths
          ? roundCurrency(remainingPrincipal)
          : roundCurrency(Math.min(remainingPrincipal, rawPrincipalPayment));

      const monthlyInstallment =
        monthNumber === totalMonths
          ? roundCurrency(principalPayment + interestPayment)
          : installment;

      remainingPrincipal = roundCurrency(Math.max(0, remainingPrincipal - principalPayment));

      rows.push({
        monthNumber,
        yearNumber: yearIndex + 1,
        annualInterestRate,
        monthlyInstallment,
        principalPayment,
        interestPayment,
        remainingPrincipal
      });

      monthNumber += 1;
    }
  }

  return {
    totalMonths,
    yearlyInterestRates: input.yearlyInterestRates,
    rows
  };
}
