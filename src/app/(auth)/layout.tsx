import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PortfoliAI – Sign in",
  description: "Authenticate to access your PortfoliAI dashboard.",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}


