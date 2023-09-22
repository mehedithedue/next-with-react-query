"use client"
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from './components/Login';

const queryClient = new QueryClient()

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
}