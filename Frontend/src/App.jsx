import { Routes, Route } from "react-router-dom";
import Form from "./_Auth/Form";
import Home from "./_Root/Home";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Form />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
