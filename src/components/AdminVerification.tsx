import React, { useState } from 'react';
import { useProvider } from '../context/ProviderContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { Save } from 'lucide-react';
import type { TransactionData } from './TransactionForm';

interface AdminVerificationProps {
    data: TransactionData;
    onSave: (refNo: string) => void;
    onCancel: () => void;
    isSaving: boolean;
}

export const AdminVerification: React.FC<AdminVerificationProps> = ({ data, onSave, onCancel, isSaving }) => {
    const { provider } = useProvider();
    const [referenceNumber, setReferenceNumber] = useState('');
    const [error, setError] = useState('');

    const isGCash = provider === 'GCash';
    const primaryColor = isGCash ? 'text-blue-600' : 'text-green-600';

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!referenceNumber.trim()) {
            setError('Reference Number is required');
            return;
        }
        onSave(referenceNumber);
    };

    return (
        <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden max-w-md w-full mx-auto">
            <CardHeader className={cn("text-white text-center py-6", isGCash ? "bg-blue-700" : "bg-black border-b-4 border-green-500")}>
                <CardTitle className="text-xl font-bold">Admin Verification</CardTitle>
                <div className="text-blue-100 text-sm opacity-90 mt-1">Please enter the official reference number</div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                {/* Transaction Summary */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-3 text-sm border border-gray-100">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Provider</span>
                        <span className={cn("font-bold", primaryColor)}>{provider}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Type</span>
                        <span className="font-semibold">{data.type}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Account</span>
                        <span className="font-mono font-medium">{data.accountNumber}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                        <span className="font-bold text-gray-700">Total to Collect</span>
                        <span className={cn("font-bold text-lg", primaryColor)}>
                            ₱{data.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            {provider} Reference No.
                        </label>
                        <Input
                            value={referenceNumber}
                            onChange={(e) => {
                                setReferenceNumber(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter Ref No..."
                            className={cn("h-12 font-mono text-lg", error && "border-red-500 focus-visible:ring-red-200")}
                        />
                        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                    </div>

                    <div className="pt-2 flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 py-6 h-auto"
                            onClick={onCancel}
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-[2] py-6 h-auto font-bold text-md"
                            variant={isGCash ? 'gcash' : 'maya'}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>Processing...</>
                            ) : (
                                <div className="flex items-center">
                                    <Save className="w-5 h-5 mr-2" />
                                    Save Record
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
