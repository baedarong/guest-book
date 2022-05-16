import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "./styles.css";

ReactDOM.render(
  <React.StrictMode>
    <App /> 
    {/* App 컴포넌트가 모든 요소의 상위에 존재하기 때문에 여기서 유저 핸들링 하는게 좋다 */}
  </React.StrictMode>,
  document.getElementById("root")
);