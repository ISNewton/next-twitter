import "@/styles/globals.css";
import {
  SessionContext,
  SessionProvider,
  getSession,
  useSession,
} from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const session = getSession();

  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
