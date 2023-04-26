
import Main from "./Main"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { StripeProvider } from "@stripe/stripe-react-native"

const stripeKey = "pk_test_51MzaheSHZMPRkKfm9OHRLzJ8N6YS9rVjRvmStBFBq2I6kx7NDw6604lo2eef9zHnkCDpzj8GLtqFozvxGWU1byOx00CSo9yTeB"

export default function App() {
  return (
    <StripeProvider
      threeDSecureParams={{
        backgroundColor: "#fff",
        timeout: 5,
      }}
      publishableKey={stripeKey}
      merchantIdentifier="marketo.com">
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
}

