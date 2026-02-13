import React from 'react';
import { Menu } from 'lucide-react';
import { useProvider } from '../context/ProviderContext';
import { cn } from '../lib/utils';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { provider } = useProvider();
    const isGCash = provider === 'GCash';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col no-print font-sans antialiased text-gray-900 transition-colors duration-500">
            {/* Sticky Header */}
            <header className={cn(
                "sticky top-0 z-50 text-white shadow-md transition-colors duration-500",
                isGCash ? "bg-blue-700" : "bg-black border-b-4 border-green-500"
            )}>
                <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg tracking-wide">
                            {isGCash ? "GCash Partner" : "Maya Center"}
                        </span>
                    </div>
                    <button className={cn(
                        "p-1 rounded-full transition-colors",
                        isGCash ? "hover:bg-blue-600" : "hover:bg-gray-800"
                    )}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-md mx-auto w-full px-4 py-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-4 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} {isGCash ? "GCash" : "Maya"} Partner Portal</p>
            </footer>
        </div>
    );
};
