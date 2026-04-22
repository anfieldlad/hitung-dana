import { useEffect, useMemo, useState } from "react";

import { formatCurrency, formatPercent, type MortgageSimulationResult } from "@kalkulator-finance/shared";

import {
  TABLE_FILTER_ALL,
  TABLE_FILTER_LABEL,
  TABLE_FILTER_YEAR,
  TABLE_RESULTS_DESCRIPTION
} from "../content";

type ResultTableProps = {
  result: MortgageSimulationResult;
};

export function ResultTable({ result }: ResultTableProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const availableYears = useMemo(
    () => Array.from(new Set(result.rows.map((row) => row.yearNumber))),
    [result.rows]
  );

  const visibleRows = useMemo(
    () =>
      selectedYear === null
        ? result.rows
        : result.rows.filter((row) => row.yearNumber === selectedYear),
    [result.rows, selectedYear]
  );

  useEffect(() => {
    setSelectedYear(null);
  }, [result]);

  return (
    <section className="card table-card">
      <div className="section-head">
        <div className="table-heading">
          <h2>Payment Table</h2>
          <p>{TABLE_RESULTS_DESCRIPTION(visibleRows.length, result.totalMonths)}</p>
        </div>
      </div>

      <div className="table-toolbar">
        <span className="table-filter-label">{TABLE_FILTER_LABEL}</span>
        <div className="table-filter-list" role="tablist" aria-label="Filter payment table by year">
          <button
            aria-pressed={selectedYear === null}
            className={selectedYear === null ? "table-filter-chip active" : "table-filter-chip"}
            onClick={() => setSelectedYear(null)}
            type="button"
          >
            {TABLE_FILTER_ALL}
          </button>
          {availableYears.map((year) => (
            <button
              aria-pressed={selectedYear === year}
              className={selectedYear === year ? "table-filter-chip active" : "table-filter-chip"}
              key={year}
              onClick={() => setSelectedYear(year)}
              type="button"
            >
              {TABLE_FILTER_YEAR(year)}
            </button>
          ))}
        </div>
      </div>

      <div className="table-surface">
        <div className="table-wrapper">
          <table className="amortization-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Rate</th>
                <th>Payment</th>
                <th>Principal Paid</th>
                <th>Interest</th>
                <th>Balance Left</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.monthNumber}>
                  <td data-label="Month">{row.monthNumber}</td>
                  <td data-label="Year">{row.yearNumber}</td>
                  <td data-label="Rate">{formatPercent(row.annualInterestRate)}%</td>
                  <td data-label="Payment">{formatCurrency(row.monthlyInstallment)}</td>
                  <td data-label="Principal Paid">{formatCurrency(row.principalPayment)}</td>
                  <td data-label="Interest">{formatCurrency(row.interestPayment)}</td>
                  <td data-label="Balance Left">{formatCurrency(row.remainingPrincipal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
