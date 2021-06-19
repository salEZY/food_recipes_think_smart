import React from "react";
import axios from "axios";

import "./Main.css";

const Main = () => {
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    axios.get("/api/").then((data) => {
      console.log(data);
      setMsg(data.data);
    });
  }, []);

  return <main>{msg}</main>;
};

export default Main;
