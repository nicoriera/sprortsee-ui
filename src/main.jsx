import { createRoot } from "react-dom/client";
import { Router } from "./routes/index";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(<Router />);
