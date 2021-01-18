import React from "react";
import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
} from "blitz";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "react-query";
import LoginForm from "app/auth/components/LoginForm";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={reset}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  );
};

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />;
  }
  if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  }
  return (
    <ErrorComponent
      statusCode={(error as any)?.statusCode || 400}
      title={error?.message || error?.name}
    />
  );
}

export default App;
