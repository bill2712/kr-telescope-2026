import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen bg-space-black text-white p-8 text-center">
                    <div className="text-6xl mb-4">💥</div>
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong.</h1>
                    <p className="bg-black/50 p-4 rounded-xl font-mono text-s text-left overflow-auto max-w-full">
                        {this.state.error?.toString()}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 bg-kidrise-orange px-6 py-2 rounded-xl font-bold text-white hover:bg-orange-600 transition"
                    >
                        Reload App
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
