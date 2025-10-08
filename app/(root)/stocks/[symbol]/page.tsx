import TradingViewWidget from "@/components/TradingViewWidget";
import { Button } from "@/components/ui/button";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/constants";
import React from "react";

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="flex min-h-screen p-4 md:p-6 lg:p-8">
      {/* LEFT COLUM */}
      <section className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-8 w-full">
        {/* SYMBOL_INFO_WIDGET_CONFIG */}
        <div className="flex flex-col gap-6">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}symbol-info.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            height={170}
          />
          {/* CANDLE_CHART_WIDGET */}
          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            className="custom-chart"
            height={600}
          />
          {/* BASELINE_WIDGET */}
          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={BASELINE_WIDGET_CONFIG(symbol)}
          />
        </div>
        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* WATCHLIST BUTTON */}
          <Button className="watchlist-btn"> Add to watchlist</Button>
          {/* TECHNICAL ANALYSIS */}

          <TradingViewWidget
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={400}
          />
          {/* COMPANY PROFILE */}
          <TradingViewWidget
            scriptUrl={`${scriptUrl}symbol-profile.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={440}
          />
          {/* COMPANY FINANCIALS */}
          <TradingViewWidget
            scriptUrl={`${scriptUrl}financials.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={464}
          />
        </div>
      </section>
    </div>
  );
}
