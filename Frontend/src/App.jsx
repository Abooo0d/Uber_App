import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_Auth/AuthLayout";
import Form from "./_Auth/Forms/Form";
import Form from "./";
function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Form />} />
      </Route>
    </Routes>
  );
}

export default App;
