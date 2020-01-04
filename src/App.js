import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layouts/Layout";
import 'rsuite/dist/styles/rsuite-default.css'

const loading = () => <div className="pt-3 text-center">Đang tải...</div>;

function App() {
  return (
    <Router>
      <React.Suspense fallback={loading()}>
        <Layout />
      </React.Suspense>
    </Router>
  );
}

export default App;
