import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/:id" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
