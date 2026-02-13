import React from 'react';
import { Printer, Share2, CheckCircle, RotateCcw } from 'lucide-react';
import type { TransactionData } from './TransactionForm';

interface SuccessScreenProps {
    data: TransactionData;
    transactionId: string;
    date: Date;
    onNewTransaction: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ data, transactionId, date, onNewTransaction }) => {
    const handlePrint = () => {
        window.print();
    };

    const formattedDate = date.toLocaleString('en-PH', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    return (
        <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="no-print flex flex-col items-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 shadow-sm">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Transaction Successful</h2>
                <p className="text-gray-500 mt-1">Ref No. {transactionId}</p>
            </div>

            {/* Main Action Buttons (No Print) */}
            <div className="w-full grid grid-cols-2 gap-3 mb-8 no-print">
                <button
                    onClick={handlePrint}
                    className="flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-md active:scale-95 transition-transform"
                >
                    <Printer className="w-5 h-5" />
                    <span>Print Receipt</span>
                </button>

                {/* Placeholder for Share/Save - just a visual button for now as per requirements */}
                <button
                    className="flex items-center justify-center space-x-2 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold shadow-sm hover:bg-gray-50 active:scale-95 transition-transform"
                >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                </button>
            </div>

            {/* Receipt Preview (Visible on Screen & Print) */}
            <div
                className="bg-white p-6 w-full max-w-[320px] shadow-sm border border-gray-100 relative print:shadow-none print:border-none print:w-full print:max-w-none print:p-0"
                style={{ fontFamily: "'Courier New', Courier, monospace" }} // Monospace for receipt feel
            >
                {/* Receipt Header */}
                <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                    <h1 className="font-bold text-xl uppercase tracking-wider">GCash Partner</h1>
                    <p className="text-xs text-gray-500 mt-1">Official Receipt</p>
                </div>

                {/* Transaction Details */}
                <div className="space-y-3 text-sm mb-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Date/Time:</span>
                        <span className="text-right font-medium">{formattedDate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Ref No:</span>
                        <span className="text-right font-medium">{transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="text-right font-bold uppercase">{data.type}</span>
                    </div>
                    <div className="border-b border-dashed border-gray-300 my-2"></div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Account Name:</span>
                    </div>
                    <div className="text-right font-bold uppercase truncate">{data.accountName}</div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Account No:</span>
                        <span className="text-right font-bold">{data.accountNumber}</span>
                    </div>
                </div>

                {/* Total */}
                <div className="border-t-2 border-dashed border-gray-300 pt-4 mb-6">
                    <div className="flex justify-between items-end">
                        <span className="text-base font-bold">TOTAL</span>
                        <span className="text-2xl font-bold">₱{data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>

                {/* Receipt Footer */}
                <div className="text-center text-xs text-gray-400">
                    <p>Thank you for using our service.</p>
                    <p className="mt-1">This is a system generated receipt.</p>
                </div>
            </div>

            {/* New Transaction Button (No Print) */}
            <div className="mt-8 w-full no-print">
                <button
                    onClick={onNewTransaction}
                    className="w-full flex items-center justify-center space-x-2 py-4 text-blue-600 font-bold hover:bg-blue-50 rounded-xl transition-colors"
                >
                    <RotateCcw className="w-5 h-5" />
                    <span>New Transaction</span>
                </button>
            </div>

        </div>
    );
};
