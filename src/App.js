import React, { useState, useEffect } from "react";
import {
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "./Components/Header";
import Form from "./Components/Form";
import VisitorsTable from "./Components/VisitorsTable";

const App = () => {
  const [visitors, setVisitors] = useState(() => {
    const storedVisitors = localStorage.getItem("visitors");
    return storedVisitors ? JSON.parse(storedVisitors) : [];
  });

  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    const storedVisitors = localStorage.getItem("visitors");
    if (storedVisitors) {
      setVisitors(JSON.parse(storedVisitors));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }, [visitors]);


  return (
    <>
      <Header />
      <Grid container spacing={2} >
        <Grid item xs={12} lg={isLgScreen ? 3.5 : 12} >
          <Form visitors={visitors} setVisitors={setVisitors} />
        </Grid>
        <Grid item xs={12} lg={isLgScreen ? 8.5 : 12} >
          <VisitorsTable visitors={visitors} setVisitors={setVisitors} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
