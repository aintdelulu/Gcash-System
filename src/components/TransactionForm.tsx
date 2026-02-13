import React, { useState } from 'react';
import { useProvider } from '../context/ProviderContext';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn } from '../lib/utils'; // Correct import path for utils

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
    provider: 'GCash' | 'Maya';
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
    const { provider } = useProvider();
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

        // Basic validation - for Maya it might be different but sticking to 11 digits for now
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
                provider
            });
        }
    };

    const isGCash = provider === 'GCash';
    const activeColor = isGCash ? 'bg-blue-600 text-white' : 'bg-green-600 text-white';
    const inactiveColor = 'text-gray-500 hover:bg-gray-100';

    return (
        <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
            <CardContent className="p-6 space-y-6">
                {/* Transaction Type Toggle */}
                <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setType('Cash-In')}
                        className={cn(
                            "flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                            type === 'Cash-In' ? activeColor + " shadow-sm" : inactiveColor
                        )}
                    >
                        <ArrowDownCircle className="w-4 h-4" />
                        <span>Cash In</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('Cash-Out')}
                        className={cn(
                            "flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                            type === 'Cash-Out' ? activeColor + " shadow-sm" : inactiveColor
                        )}
                    >
                        <ArrowUpCircle className="w-4 h-4" />
                        <span>Cash Out</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Account Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Account Name</label>
                        <Input
                            type="text"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className={cn("h-14 text-lg font-medium", errors.accountName && "border-red-500 focus-visible:ring-red-200")}
                            placeholder="Juan dela Cruz"
                        />
                        {errors.accountName && <p className="text-xs text-red-500 font-medium ml-1">{errors.accountName}</p>}
                    </div>

                    {/* Account Number */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Account Number</label>
                        <Input
                            type="tel"
                            value={accountNumber}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                                setAccountNumber(val);
                            }}
                            className={cn("h-14 text-lg font-mono tracking-widest", errors.accountNumber && "border-red-500 focus-visible:ring-red-200")}
                            placeholder="09XXXXXXXXX"
                        />
                        {errors.accountNumber && <p className="text-xs text-red-500 font-medium ml-1">{errors.accountNumber}</p>}
                    </div>

                    {/* Amount */}
                    <div className="space-y-1.5 relative">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Amount</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <span className="text-gray-400 font-bold text-xl">₱</span>
                            </div>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className={cn("h-14 pl-10 text-xl font-bold", errors.amount && "border-red-500 focus-visible:ring-red-200")}
                                placeholder="0.00"
                                step="0.01"
                                min="1"
                            />
                        </div>
                        {errors.amount && <p className="text-xs text-red-500 font-medium ml-1">{errors.amount}</p>}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full font-bold text-md mt-4"
                        variant={isGCash ? 'gcash' : 'maya'}
                    >
                        Review Transaction
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
