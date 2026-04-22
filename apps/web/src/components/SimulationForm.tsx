import type { FormEvent } from "react";

import {
  ACTION_HELPER_TEXT,
  ADVANCED_OPTIONS_DESCRIPTION,
  ADVANCED_OPTIONS_TITLE,
  CALCULATED_PRINCIPAL_LABEL,
  DOWN_PAYMENT_LABEL,
  FORM_DESCRIPTION,
  FORM_TITLE,
  PROPERTY_PRICE_LABEL,
  SUBMIT_LABEL,
  USE_CALCULATED_PRINCIPAL_LABEL,
  YEARLY_RATES_COUNT_NOTE,
  YEARLY_RATES_EMPTY_MESSAGE,
  YEARLY_RATES_READY_MESSAGE,
  YEARLY_RATES_TITLE
} from "../content";
import type { FormState } from "../types";

type SimulationFormProps = {
  derivedPrincipalError: string | null;
  errorMessage: string | null;
  formattedCalculatedPrincipal: string | null;
  formattedDownPayment: string;
  formattedPrincipal: string;
  formattedPropertyPrice: string;
  formState: FormState;
  isFormReady: boolean;
  scenarioLabel: string;
  tenorNumber: number;
  variant?: "comparison" | "primary";
  onApplyCalculatedPrincipal: () => void;
  onDownPaymentChange: (value: string) => void;
  onPrincipalChange: (value: string) => void;
  onPropertyPriceChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTenorChange: (value: string) => void;
  onYearlyRateChange: (index: number, value: string) => void;
};

export function SimulationForm({
  derivedPrincipalError,
  errorMessage,
  formattedCalculatedPrincipal,
  formattedDownPayment,
  formattedPrincipal,
  formattedPropertyPrice,
  formState,
  isFormReady,
  scenarioLabel,
  tenorNumber,
  variant = "primary",
  onApplyCalculatedPrincipal,
  onDownPaymentChange,
  onPrincipalChange,
  onPropertyPriceChange,
  onSubmit,
  onTenorChange,
  onYearlyRateChange
}: SimulationFormProps) {
  const cardClassName =
    variant === "comparison" ? "card form-card comparison-form-card" : "card form-card";

  return (
    <section className={cardClassName}>
      <form onSubmit={onSubmit}>
        <div className="section-head">
          <div>
            <h2>
              {FORM_TITLE}: <span className="section-tag">{scenarioLabel}</span>
            </h2>
            <p>{FORM_DESCRIPTION}</p>
          </div>
        </div>

        <div className="field-grid">
          <label className="field">
            <span>Loan Amount</span>
            <div className="currency-input">
              <span className="currency-prefix">Rp</span>
              <input
                inputMode="numeric"
                placeholder="For example: 500,000,000"
                type="text"
                value={formattedPrincipal}
                onChange={(event) => onPrincipalChange(event.target.value)}
              />
            </div>
          </label>

          <label className="field">
            <span>Loan Term (Years)</span>
            <input
              inputMode="numeric"
              min="1"
              step="1"
              placeholder="For example: 15"
              type="number"
              value={formState.tenorYears}
              onChange={(event) => onTenorChange(event.target.value)}
            />
            {tenorNumber > 0 ? (
              <small className="field-note">{YEARLY_RATES_COUNT_NOTE(tenorNumber)}</small>
            ) : null}
          </label>
        </div>

        <details className="advanced-panel">
          <summary>{ADVANCED_OPTIONS_TITLE}</summary>
          <p className="advanced-description">{ADVANCED_OPTIONS_DESCRIPTION}</p>

          <div className="field-grid">
            <label className="field">
              <span>{PROPERTY_PRICE_LABEL}</span>
              <div className="currency-input">
                <span className="currency-prefix">Rp</span>
                <input
                  inputMode="numeric"
                  placeholder="For example: 800,000,000"
                  type="text"
                  value={formattedPropertyPrice}
                  onChange={(event) => onPropertyPriceChange(event.target.value)}
                />
              </div>
            </label>

            <label className="field">
              <span>{DOWN_PAYMENT_LABEL}</span>
              <div className="currency-input">
                <span className="currency-prefix">Rp</span>
                <input
                  inputMode="numeric"
                  placeholder="For example: 200,000,000"
                  type="text"
                  value={formattedDownPayment}
                  onChange={(event) => onDownPaymentChange(event.target.value)}
                />
              </div>
            </label>
          </div>

          {formattedCalculatedPrincipal ? (
            <div className="advanced-result">
              <div>
                <span>{CALCULATED_PRINCIPAL_LABEL}</span>
                <strong>{formattedCalculatedPrincipal}</strong>
              </div>
              <button className="secondary-button" onClick={onApplyCalculatedPrincipal} type="button">
                {USE_CALCULATED_PRINCIPAL_LABEL}
              </button>
            </div>
          ) : null}

          {derivedPrincipalError ? <p className="inline-error">{derivedPrincipalError}</p> : null}
        </details>

        <div className="section-head compact">
          <div>
            <h2>{YEARLY_RATES_TITLE}</h2>
            <p>
              {formState.yearlyInterestRates.length > 0
                ? YEARLY_RATES_READY_MESSAGE(formState.yearlyInterestRates.length)
                : YEARLY_RATES_EMPTY_MESSAGE}
            </p>
          </div>
        </div>

        <div className="rate-grid">
          {formState.yearlyInterestRates.map((rate, index) => (
            <label className="field field-small" key={`year-rate-${index + 1}`}>
              <span>Year {index + 1}</span>
              <div className="suffix-input">
                <input
                  aria-label={`Interest rate for year ${index + 1}`}
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  placeholder="5.00"
                  type="number"
                  value={rate}
                  onChange={(event) => onYearlyRateChange(index, event.target.value)}
                />
                <span>%</span>
              </div>
            </label>
          ))}
        </div>

        <div className="action-row">
          <p className="helper-text">{ACTION_HELPER_TEXT}</p>
          <button className="primary-button" disabled={!isFormReady} type="submit">
            {SUBMIT_LABEL}
          </button>
        </div>

        {errorMessage ? (
          <p aria-live="polite" className="error-banner">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </section>
  );
}
