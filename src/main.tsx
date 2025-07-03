import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const rootEl = document.getElementById("root");
if (!rootEl) {
	throw new Error("Failed to find root element");
}

createRoot(rootEl).render(<App />);
