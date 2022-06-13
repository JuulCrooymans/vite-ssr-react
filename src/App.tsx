import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

// Generate all the routes in the pages folder
// @ts-ignore
const pages = import.meta.globEager("./pages/*.tsx"); // https://vitejs.dev/guide/features.html#glob-import
const routes = Object.keys(pages).map((page) => {
  // @ts-ignore
  const name = page.match(/\.\/pages\/(.*)\.tsx$/)[1];
  return {
    path: name === "index" ? "/" : `/${name.toLowerCase()}`,
    Component: pages[page].default, // Get the default export on the page
  };
});

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route
            key={path}
            index={path === "/"}
            path={path}
            element={<Component />}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
