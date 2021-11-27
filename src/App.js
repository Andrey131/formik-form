import { ChakraProvider } from "@chakra-ui/react";
import LoginPageContainer from "./components/LoginPageContainer";

function App() {
  return (
    <ChakraProvider>
      <LoginPageContainer />
    </ChakraProvider>
  );
}

export default App;
