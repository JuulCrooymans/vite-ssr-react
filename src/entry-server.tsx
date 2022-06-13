// Server
import { StaticRouter } from "react-router-dom/server";
import ReactDOMServer from "react-dom/server";
import App from "./App";

// Initial render on the server
export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
