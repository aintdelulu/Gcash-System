import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface TransactionFormProps {
    onSubmit: (data: TransactionData) => void;
}

export interface TransactionData {
    type: 'Cash-In' | 'Cash-Out';
    accountName: string;
    accountNumber: string;
    amount: number;
    fee: number;
    totalAmount: number;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
    const [type, setType] = useState<'Cash-In' | 'Cash-Out'>('Cash-In');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof TransactionData, string>>>({});

    // Validation Logic
    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof TransactionData, string>> = {};
        let isValid = true;

        if (!accountName.trim()) {
            newErrors.accountName = 'Account Name is required';
            isValid = false;
        }

        if (!/^09\d{9}$/.test(accountNumber)) {
            newErrors.accountNumber = 'Must be 11 digits starting with 09';
            isValid = false;
        }

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount < 1) {
            newErrors.amount = 'Amount must be at least 1.00';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const calculateFee = (amountVal: number): number => {
        if (amountVal <= 1000) return 10;
        const excess = amountVal - 1000;
        const increments = Math.ceil(excess / 500);
        return 10 + (increments * 5);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const numAmount = parseFloat(amount);
            const fee = calculateFee(numAmount);
            onSubmit({
                type,
                accountName,
                accountNumber,
                amount: numAmount,
                fee,
                totalAmount: numAmount + fee,
            });
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Transaction Type Toggle */}
            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                    type="button"
                    onClick={() => setType('Cash-In')}
                    className={clsx(
                        "flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-all",
                        type === 'Cash-In' ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                    )}
                >
                    <ArrowDownCircle className="w-4 h-4" />
                    <span>Cash In</span>
                </button>
                <button
                    type="button"
                    onClick={() => setType('Cash-Out')}
                    className={clsx(
                        "flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-all",
                        type === 'Cash-Out' ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                    )}
                >
                    <ArrowUpCircle className="w-4 h-4" />
                    <span>Cash Out</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Account Name */}
                <div className="relative">
                    <input
                        type="text"
                        id="accountName"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className={clsx(
                            "block w-full px-4 py-3 text-gray-900 bg-gray-50 border rounded-lg appearance-none focus:outline-none focus:ring-2 peer transition-colors",
                            errors.accountName ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                        )}
                        placeholder=" "
                    />
                    <label
                        htmlFor="accountName"
                        className={clsx(
                            "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 pointer-events-none",
                            errors.accountName ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600"
                        )}
                    >
                        Account Name
                    </label>
                    {errors.accountName && <p className="mt-1 text-xs text-red-500">{errors.accountName}</p>}
                </div>

                {/* Account Number */}
                <div className="relative">
                    <input
                        type="tel"
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                            setAccountNumber(val);
                        }}
                        pattern="\d*"
                        maxLength={11}
                        className={clsx(
                            "block w-full px-4 py-3 text-lg font-mono tracking-widest text-gray-900 bg-gray-50 border rounded-lg appearance-none focus:outline-none focus:ring-2 peer transition-colors",
                            errors.accountNumber ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                        )}
                        placeholder=" "
                    />
                    <label
                        htmlFor="accountNumber"
                        className={clsx(
                            "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 pointer-events-none",
                            errors.accountNumber ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600"
                        )}
                    >
                        Account Number (09XXXXXXXXX)
                    </label>
                    {errors.accountNumber && <p className="mt-1 text-xs text-red-500">{errors.accountNumber}</p>}
                </div>

                {/* Amount */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <span className="text-gray-500 font-bold">₱</span>
                    </div>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        step="0.01"
                        min="1"
                        className={clsx(
                            "block w-full pl-8 pr-4 py-3 text-xl font-bold text-gray-900 bg-gray-50 border rounded-lg appearance-none focus:outline-none focus:ring-2 peer transition-colors",
                            errors.amount ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                        )}
                        placeholder=" "
                    />
                    <label
                        htmlFor="amount"
                        className={clsx(
                            "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-6 pointer-events-none",
                            errors.amount ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600"
                        )}
                    >
                        Amount
                    </label>
                    {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-md active:scale-[0.98] transition-all"
                >
                    Review Transaction
                </button>
            </form>
        </div>
    );
};
