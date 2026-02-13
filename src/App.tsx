import { useState } from 'react';
import { Layout } from './components/Layout';
import { TransactionForm, type TransactionData } from './components/TransactionForm';
import { ReviewModal } from './components/ReviewModal';
import { SuccessScreen } from './components/SuccessScreen';

type Step = 'input' | 'review' | 'success';

function App() {
  const [step, setStep] = useState<Step>('input');
  const [data, setData] = useState<TransactionData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [transactionDate, setTransactionDate] = useState<Date | null>(null);

  const handleFormSubmit = (formData: TransactionData) => {
    setData(formData);
    setStep('review');
  };

  const handleConfirm = async () => {
    if (!data) return;

    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newTransactionId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setTransactionId(newTransactionId);
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
        <TransactionForm onSubmit={handleFormSubmit} />
      )}

      {step === 'review' && data && (
        <>
          {/* We keep the form visible in background but maybe blurred or just show modal overlay */}
          <div className="opacity-50 pointer-events-none filter blur-sm">
            <TransactionForm onSubmit={() => { }} />
          </div>
          <ReviewModal
            data={data}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            isProcessing={isProcessing}
          />
        </>
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

export default App;
