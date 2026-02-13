import React from 'react';
import { Menu } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col no-print">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-blue-700 text-white shadow-md">
                <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg tracking-wide">GCash Partner</span>
                    </div>
                    <button className="p-1 hover:bg-blue-600 rounded-full transition-colors">
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
                <p>&copy; {new Date().getFullYear()} GCash Partner Portal</p>
            </footer>
        </div>
    );
};
