import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface ReactQueryProviderProps {
	children: React.ReactNode;
}

const queryClient = new QueryClient();

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
