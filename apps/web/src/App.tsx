import { useState } from "react";

import { ComparisonSummary } from "./components/ComparisonSummary";
import { EmptyState } from "./components/EmptyState";
import { ResultTable } from "./components/ResultTable";
import { SimulationForm } from "./components/SimulationForm";
import { SummaryCards } from "./components/SummaryCards";
import {
  COMPARE_SCENARIO_BUTTON,
  EMPTY_TABLE_DESCRIPTION,
  EMPTY_TABLE_TITLE,
  HIDE_COMPARE_SCENARIO_BUTTON,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  SCENARIO_A_LABEL,
  SCENARIO_B_LABEL
} from "./content";
import { useMortgageSimulation } from "./hooks/useMortgageSimulation";

export default function App() {
  const currentYear = new Date().getFullYear();
  const [comparisonEnabled, setComparisonEnabled] = useState(false);
  const [activeTable, setActiveTable] = useState<"primary" | "comparison">("primary");

  const primary = useMortgageSimulation();
  const comparison = useMortgageSimulation();

  const displayedResult =
    comparisonEnabled && activeTable === "comparison" && comparison.result
      ? comparison.result
      : primary.result;

  return (
    <main className="app-shell">
      <section className="page-header">
        <h1>{PAGE_TITLE}</h1>
        <p>{PAGE_DESCRIPTION}</p>
      </section>

      <div className="compare-toggle-row">
        <button
          className="secondary-button"
          onClick={() => {
            setComparisonEnabled((current) => !current);
            setActiveTable("primary");
          }}
          type="button"
        >
          {comparisonEnabled ? HIDE_COMPARE_SCENARIO_BUTTON : COMPARE_SCENARIO_BUTTON}
        </button>
      </div>

      <div className={comparisonEnabled ? "forms-stack is-compare" : "forms-stack"}>
        <SimulationForm
          derivedPrincipalError={primary.derivedPrincipalError}
          errorMessage={primary.errorMessage}
          formattedCalculatedPrincipal={primary.formattedCalculatedPrincipal}
          formattedDownPayment={primary.formattedDownPayment}
          formattedPrincipal={primary.formattedPrincipal}
          formattedPropertyPrice={primary.formattedPropertyPrice}
          formState={primary.formState}
          isFormReady={primary.formIsReady}
          scenarioLabel={SCENARIO_A_LABEL}
          tenorNumber={primary.tenorNumber}
          variant="primary"
          onApplyCalculatedPrincipal={primary.applyCalculatedPrincipal}
          onDownPaymentChange={primary.updateDownPayment}
          onPrincipalChange={primary.updatePrincipal}
          onPropertyPriceChange={primary.updatePropertyPrice}
          onSubmit={primary.handleSubmit}
          onTenorChange={primary.updateTenor}
          onYearlyRateChange={primary.updateYearlyRate}
        />

        {comparisonEnabled ? (
          <SimulationForm
            derivedPrincipalError={comparison.derivedPrincipalError}
            errorMessage={comparison.errorMessage}
            formattedCalculatedPrincipal={comparison.formattedCalculatedPrincipal}
            formattedDownPayment={comparison.formattedDownPayment}
            formattedPrincipal={comparison.formattedPrincipal}
            formattedPropertyPrice={comparison.formattedPropertyPrice}
            formState={comparison.formState}
            isFormReady={comparison.formIsReady}
            scenarioLabel={SCENARIO_B_LABEL}
            tenorNumber={comparison.tenorNumber}
            variant="comparison"
            onApplyCalculatedPrincipal={comparison.applyCalculatedPrincipal}
            onDownPaymentChange={comparison.updateDownPayment}
            onPrincipalChange={comparison.updatePrincipal}
            onPropertyPriceChange={comparison.updatePropertyPrice}
            onSubmit={comparison.handleSubmit}
            onTenorChange={comparison.updateTenor}
            onYearlyRateChange={comparison.updateYearlyRate}
          />
        ) : null}
      </div>

      {primary.summary ? <SummaryCards summary={primary.summary} /> : null}

      {comparisonEnabled && primary.summary && comparison.summary ? (
        <ComparisonSummary
          leftLabel={SCENARIO_A_LABEL}
          leftSummary={primary.summary}
          rightLabel={SCENARIO_B_LABEL}
          rightSummary={comparison.summary}
        />
      ) : null}

      {comparisonEnabled && (primary.result || comparison.result) ? (
        <div className="table-switcher">
          <button
            className={activeTable === "primary" ? "switcher-button active" : "switcher-button"}
            onClick={() => setActiveTable("primary")}
            type="button"
          >
            {SCENARIO_A_LABEL}
          </button>
          <button
            className={activeTable === "comparison" ? "switcher-button active" : "switcher-button"}
            disabled={!comparison.result}
            onClick={() => setActiveTable("comparison")}
            type="button"
          >
            {SCENARIO_B_LABEL}
          </button>
        </div>
      ) : null}

      {displayedResult ? (
        <ResultTable result={displayedResult} />
      ) : (
        <EmptyState description={EMPTY_TABLE_DESCRIPTION} title={EMPTY_TABLE_TITLE} />
      )}

      <footer className="app-footer">
        <p>
          &copy; {currentYear}{" "}
          <a href="https://badai.tech/" rel="noreferrer" target="_blank">
            BAD AI
          </a>
        </p>
      </footer>
    </main>
  );
}
