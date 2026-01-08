// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { Suspense } from 'react';
import { CustomizerContextProvider } from './context/CustomizerContext';
import { AuthProvider } from './context/AuthContext';
import { VendorProvider } from './context/VendorContext';
import { FinancialProvider } from './context/FinancialContext';
import ReactDOM from 'react-dom/client';
import App from './App';

import Spinner from './views/spinner/Spinner';
import './utils/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <VendorProvider>
      <FinancialProvider>
        <CustomizerContextProvider>
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </CustomizerContextProvider>
      </FinancialProvider>
    </VendorProvider>
  </AuthProvider>,
)
