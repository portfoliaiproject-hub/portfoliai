"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface CompanyCardProps {
  ticker: string
  name: string
  snapshot: string
  moat: string
  risks: string[]
  valuationMetrics: {
    pe: string
    ps: string
    industryPE: string
    industryPS: string
    marginOfSafety: string
  }
  fit: string
}

function generateLinks(ticker: string, name: string): { label: string; url: string }[] {
  return [
    {
      label: `${name} SEC Filings (Google Search)`,
      url: `https://www.google.com/search?q=${name}+${ticker}+SEC+filings`
    },
    {
      label: `${name} Financial Ratios (Google Search)`,
      url: `https://www.google.com/search?q=${name}+${ticker}+financial+ratios`
    },
    {
      label: `${name} Stock News`,
      url: `https://www.google.com/search?q=${name}+${ticker}+stock+news`
    },
    {
      label: "Investopedia: P/E Ratio",
      url: "https://www.investopedia.com/terms/p/price-earningsratio.asp"
    }
  ]
}

export function CompanyCard({
  ticker,
  name,
  snapshot,
  moat,
  risks,
  valuationMetrics,
  fit
}: CompanyCardProps) {
  const links = generateLinks(ticker, name)

  return (
    <Card className="w-full max-w-md sm:max-w-lg border rounded-xl shadow-sm bg-white">
      <CardHeader>
        <h2 className="text-lg font-semibold">{name} ({ticker})</h2>
        <p className="text-sm text-gray-500">Company Analysis</p>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <div>
          <h3 className="font-medium text-gray-800">📌 Snapshot</h3>
          <p className="text-gray-600">{snapshot}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-800">🛡️ Moat / Edge</h3>
          <p className="text-gray-600">{moat}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-800">⚠️ Risks</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {risks.map((risk, idx) => (
              <li key={idx}>{risk}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-800">💵 Valuation</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>P/E: {valuationMetrics.pe} (Industry avg: {valuationMetrics.industryPE})</li>
            <li>P/S: {valuationMetrics.ps} (Industry avg: {valuationMetrics.industryPS})</li>
            <li>Margin of Safety: {valuationMetrics.marginOfSafety}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-800">🎯 Investor Fit</h3>
          <p className="text-gray-600">{fit}</p>
        </div>

        {links && (
          <div>
            <h3 className="font-medium text-gray-800">🔎 Dig Deeper</h3>
            <ul className="list-disc pl-5 text-blue-600 space-y-1">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline break-words">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 