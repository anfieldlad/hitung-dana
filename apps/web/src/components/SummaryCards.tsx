import { formatCurrency } from "@kalkulator-finance/shared";

import type { SimulationSummary } from "../types";

type SummaryCardsProps = {
  summary: SimulationSummary;
};

export function SummaryCards({ summary }: SummaryCardsProps) {
  const items = [
    { label: "First Month", value: formatCurrency(summary.firstInstallment) },
    { label: "Last Month", value: formatCurrency(summary.lastInstallment) },
    { label: "Total Interest", value: formatCurrency(summary.totalInterest) },
    { label: "Total Paid", value: formatCurrency(summary.totalPayment) }
  ];

  return (
    <section className="summary-grid" aria-label="Payment summary">
      {items.map((item) => (
        <article className="summary-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
}
