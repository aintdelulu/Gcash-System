import React from 'react';
import { useProvider } from '../context/ProviderContext';
import { cn } from '../lib/utils';
import { Check } from 'lucide-react';

export const ProviderSelector: React.FC = () => {
    const { provider, setProvider } = useProvider();

    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            <button
                onClick={() => setProvider('GCash')}
                className={cn(
                    "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 overflow-hidden group",
                    provider === 'GCash'
                        ? "border-blue-500 bg-blue-50/50 shadow-md shadow-blue-100"
                        : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50"
                )}
            >
                {provider === 'GCash' && (
                    <div className="absolute top-2 right-2 text-blue-600">
                        <Check className="w-5 h-5" />
                    </div>
                )}
                {/* Simulated GCash Logo */}
                <div className="w-12 h-12 bg-blue-600 rounded-xl mb-2 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-110 transition-transform">
                    G
                </div>
                <span className={cn("font-bold text-sm", provider === 'GCash' ? "text-blue-700" : "text-gray-600")}>GCash</span>
            </button>

            <button
                onClick={() => setProvider('Maya')}
                className={cn(
                    "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 overflow-hidden group",
                    provider === 'Maya'
                        ? "border-green-500 bg-green-50/50 shadow-md shadow-green-100"
                        : "border-gray-200 bg-white hover:border-green-200 hover:bg-gray-50"
                )}
            >
                {provider === 'Maya' && (
                    <div className="absolute top-2 right-2 text-green-600">
                        <Check className="w-5 h-5" />
                    </div>
                )}
                {/* Simulated Maya Logo */}
                <div className="w-12 h-12 bg-black rounded-xl mb-2 flex items-center justify-center text-white font-bold text-lg border-b-4 border-green-500 shadow-sm group-hover:scale-110 transition-transform">
                    M
                </div>
                <span className={cn("font-bold text-sm", provider === 'Maya' ? "text-green-700" : "text-gray-600")}>Maya</span>
            </button>
        </div>
    );
};
