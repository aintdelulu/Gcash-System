import { useState } from 'react';
import { Layout } from './components/Layout';
import { TransactionForm, type TransactionData } from './components/TransactionForm';
import { ReviewModal } from './components/ReviewModal';
import { SuccessScreen } from './components/SuccessScreen';
import { ProviderProvider } from './context/ProviderContext';
import { ProviderSelector } from './components/ProviderSelector';

import { AdminVerification } from './components/AdminVerification';
import { submitToFormspree } from './lib/formspree';

type Step = 'input' | 'review' | 'admin-verification' | 'success';

function AppContent() {
  const [step, setStep] = useState<Step>('input');
  const [data, setData] = useState<TransactionData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [transactionDate, setTransactionDate] = useState<Date | null>(null);

  const handleFormSubmit = (formData: TransactionData) => {
    setData(formData);
    setStep('review');
  };

  const handleConfirmReview = async () => {
    // Move to Admin Verification instead of direct success
    setStep('admin-verification');
  };

  const handleSaveTransaction = async (referenceNumber: string) => {
    if (!data) return;

    setIsProcessing(true);

    // Prepare data for Formspree
    const submissionData = {
      ...data,
      referenceNumber,
      timestamp: new Date().toISOString(),
    };

    // Submit to Formspree
    const result = await submitToFormspree(submissionData, 'mwvnladw');

    if (!result.success) {
      console.error('Failed to submit to Formspree:', result.error);
      // You can add a toast notification here if you have a toast library
      // For now, we'll still proceed to success screen for demo purposes
    } else {
      console.log('Successfully submitted to Formspree!');
    }

    // Simulate delay for effect
    await new Promise(resolve => setTimeout(resolve, 1000));

    setTransactionId(referenceNumber); // Use the real ref no as the ID
    setTransactionDate(new Date());

    setIsProcessing(false);
    setStep('success');
  };

  const handleCancel = () => {
    setStep('input');
  };

  const handleNewTransaction = () => {
    setData(null);
    setTransactionId('');
    setTransactionDate(null);
    setStep('input');
  };

  return (
    <Layout>
      {step === 'input' && (
        <>
          <ProviderSelector />
          <TransactionForm onSubmit={handleFormSubmit} />
        </>
      )}

      {step === 'review' && data && (
        <>
          <div className="opacity-50 pointer-events-none filter blur-sm">
            <ProviderSelector />
            <TransactionForm onSubmit={() => { }} />
          </div>
          <ReviewModal
            data={data}
            onConfirm={handleConfirmReview}
            onCancel={handleCancel}
            isProcessing={false}
          />
        </>
      )}

      {step === 'admin-verification' && data && (
        <AdminVerification
          data={data}
          onSave={handleSaveTransaction}
          onCancel={() => setStep('review')} // Go back to review
          isSaving={isProcessing}
        />
      )}

      {step === 'success' && data && transactionDate && (
        <SuccessScreen
          data={data}
          transactionId={transactionId}
          date={transactionDate}
          onNewTransaction={handleNewTransaction}
        />
      )}
    </Layout>
  );
}

function App() {
  return (
    <ProviderProvider>
      <AppContent />
    </ProviderProvider>
  );
}

export default App;
