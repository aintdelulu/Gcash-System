import React from 'react';
import { X } from 'lucide-react';
import type { TransactionData } from './TransactionForm';

interface ReviewModalProps {
    data: TransactionData;
    onConfirm: () => void;
    onCancel: () => void;
    isProcessing: boolean;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ data, onConfirm, onCancel, isProcessing }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800">Review Transaction</h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                        <span className="block text-sm text-blue-600 font-medium uppercase tracking-wider">{data.type}</span>
                        <span className="block text-3xl font-bold text-blue-900 mt-1">
                            ₱{data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Account Name</span>
                            <span className="font-semibold text-gray-900 text-right">{data.accountName}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Account Number</span>
                            <span className="font-mono font-semibold text-gray-900">{data.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Service Fee</span>
                            <span className="font-semibold text-gray-900">₱0.00</span>
                        </div>
                        <div className="flex justify-between pt-2">
                            <span className="text-gray-900 font-bold">Total Amount</span>
                            <span className="font-bold text-blue-700">₱{data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-0">
                    <button
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <span>Confirm Transaction</span>
                        )}
                    </button>
                    <button
                        onClick={onCancel}
                        disabled={isProcessing}
                        className="w-full mt-3 py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
