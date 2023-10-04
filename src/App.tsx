import { QueryClientProvider, QueryClient } from "react-query";

import Main from "src/components/page/Main";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

export default App;
