import React from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import ApiDocumentation from "./pages/api-documentation";
import NormalDocumentation from "./pages/normal-documentation";
import PreviewDocument from "./pages/preview-document";
export default class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Router>
        <NavBar />
        <Routes>
          <Route path="/api-documentation"  element={<ApiDocumentation/>}/>
          <Route path="/normal-documentation"  element={<NormalDocumentation/>}/>
          <Route path="/preview-document"  element={<PreviewDocument/>}/>
        </Routes>
          
        </Router>
       
      </div>
    );
  }
}

