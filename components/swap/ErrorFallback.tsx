interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500">
      <h2 className="text-red-500 font-semibold mb-2">Something went wrong:</h2>
      <pre className="text-sm text-red-400 mb-4">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
