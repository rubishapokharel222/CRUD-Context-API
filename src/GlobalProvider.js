import { ProductProvider } from "./contexts/product/ProductContext";
import composeProviders from "./utils/composeProviders";

const providers = [ProductProvider];

const GlobalProvider = composeProviders(providers);

export default GlobalProvider;
