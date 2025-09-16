"use client"

import Link from "next/link"
import DemoChat from "@/components/marketing/demo-chat"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-6xl">PortfoliAI: Your Investment Partner.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">Become an investment expert with personalized guidance, powerful research, and a personal investment diary.</p>
            <div className="mt-8">
              <Link href="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-all duration-200">Sign Up for Free</Link>
            </div>
            <div className="mt-10 max-w-3xl mx-auto">
              <DemoChat />
            </div>
          </div>
        </div>
      </section>

      {/* Investor Profiling */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Your Journey, Your Way.</h2>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">PortfoliAI guides you based on your unique profile. Get a tailored experience from the very first step.</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <ProfileCard title="What is your investment experience level?" options={["Beginner", "Intermediate", "Advanced"]} />
          <ProfileCard title="What is your risk tolerance?" options={["Conservative", "Moderate", "Aggressive"]} />
          <ProfileCard title="What is your time horizon?" options={["< 1 year", "1-3 years", "> 3 years"]} />
        </div>
      </section>

      {/* Research Partner */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-900 text-center">Make Smarter Decisions. Get the Data.</h3>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">PortfoliAI is your research companion — explore company fundamentals, market sentiment, and performance at a glance.</p>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mock company cards grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CompanyMockCard name="Tesla" ticker="TSLA" price="$212.34" change="+1.8%" trend="up" />
            <CompanyMockCard name="Apple" ticker="AAPL" price="$186.20" change="+0.7%" trend="up" />
            <CompanyMockCard name="NVIDIA" ticker="NVDA" price="$904.11" change="-0.9%" trend="down" />
            <CompanyMockCard name="Microsoft" ticker="MSFT" price="$414.88" change="+0.3%" trend="up" />
          </div>
          {/* Sentiment + Stock chart */}
          <div className="space-y-6">
            <div className="border rounded-xl shadow-sm bg-white p-6">
              <h4 className="text-lg font-semibold text-gray-900">News Sentiment</h4>
              <p className="text-sm text-gray-600 mt-2">Headline: EV adoption accelerates across major markets</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm text-gray-600">Sentiment:</span>
                <span className="px-2 py-1 rounded-full text-xs bg-emerald-50 text-emerald-600 border border-emerald-200">Positive</span>
              </div>
            </div>
            <div className="border rounded-xl shadow-sm bg-white p-6">
              <h4 className="text-lg font-semibold text-gray-900">Stock Performance</h4>
              <p className="text-sm text-gray-600">Mock historical performance</p>
              <MiniLineChart />
            </div>
          </div>
        </div>
      </section>



      {/* Investment Diary */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-900 text-center">A Diary for Your Investment Thoughts.</h3>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">Capture ideas, track decisions, and reflect on your strategy with a focused investment journal.</p>
        <div className="mt-8 border rounded-xl shadow-sm bg-white p-6">
          <div className="space-y-4">
            <DiaryEntry ts="Today, 10:24 AM" text="Noted: Considering adding an ETF to balance my tech exposure." />
            <DiaryEntry ts="Yesterday, 5:02 PM" text="Idea: Researching renewable energy stocks after this week's news." />
            <DiaryEntry ts="Mon, 9:13 AM" text="Reminder: Revisit risk assessment after earnings season." />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="border rounded-xl shadow-sm bg-white p-8 text-center">
          <h4 className="text-2xl font-bold text-gray-900">Ready to Take Control of Your Portfolio?</h4>
          <div className="mt-6">
            <Link href="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-all duration-200">Sign Up for Free</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function ProfileCard({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="border rounded-xl shadow-sm bg-white p-6">
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} className="px-3 py-1.5 text-xs rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

function CompanyMockCard({ name, ticker, price, change, trend }: { name: string; ticker: string; price: string; change: string; trend: "up" | "down" }) {
  return (
    <div className="border rounded-xl shadow-sm bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{ticker}</div>
          <div className="text-lg font-semibold text-gray-900">{name}</div>
        </div>
        <div className={`text-sm font-medium ${trend === "up" ? "text-emerald-600" : "text-red-600"}`}>{change}</div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <div className="text-gray-900 font-medium">{price}</div>
      </div>
      <MiniSparkline trend={trend} />
    </div>
  )
}

function MiniSparkline({ trend }: { trend: "up" | "down" }) {
  const path = trend === "up" ? "M2 18 C 8 10, 16 6, 30 4" : "M2 4 C 10 8, 18 14, 30 18"
  const stroke = trend === "up" ? "#10B981" : "#EF4444"
  return (
    <svg viewBox="0 0 32 22" className="mt-3 w-full h-16">
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" />
      <line x1="0" y1="20" x2="32" y2="20" stroke="rgba(229,231,235,0.8)" strokeWidth="1" />
    </svg>
  )
}

function MiniLineChart() {
  return (
    <svg viewBox="0 0 100 40" className="mt-3 w-full h-28">
      <polyline fill="none" stroke="#4F46E5" strokeWidth="2" points="0,30 10,28 20,26 30,22 40,24 50,18 60,14 70,16 80,10 90,12 100,8" />
      <line x1="0" y1="35" x2="100" y2="35" stroke="rgba(229,231,235,0.8)" strokeWidth="1" />
    </svg>
  )
}

function DiaryEntry({ ts, text }: { ts: string; text: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="text-xs text-gray-500">{ts}</div>
      <div className="text-sm text-gray-800 mt-1">{text}</div>
    </div>
  )
}
