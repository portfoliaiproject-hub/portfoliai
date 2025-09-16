"use client"

import React from "react"

export type ErrorBoundaryKind = "auth" | "network" | "component" | "unknown"

export interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  kind: ErrorBoundaryKind
}

/**
 * ErrorBoundary
 *
 * Catches render-time errors and shows a fallback with a retry option.
 * Logs error details to the console for now; can be extended to send to
 * external logging services.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, kind: "unknown" }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, kind: "component" }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught: ", error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, kind: "unknown" })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="p-6 text-center">
          <h2 className="mb-2 text-lg font-semibold">Something went wrong</h2>
          <p className="mb-4 text-sm text-white/70">An unexpected error occurred. Try again.</p>
          <button className="rounded bg-blue-600 px-4 py-2 text-sm" onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary


