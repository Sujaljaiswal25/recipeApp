import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorState = ({ error, onRetry, className = "" }) => (
  <div className={`text-center py-12 ${className}`}>
    <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Oops! Something went wrong
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
      {error || 'We encountered an error while fetching recipes. Please try again.'}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Try Again</span>
      </button>
    )}
  </div>
);

export default ErrorState;