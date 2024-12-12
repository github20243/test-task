  import React from "react";
  import Header from "./Header";
  import { Container } from "@mui/material";
  import { Outlet } from "react-router-dom";

  const Layouts: React.FC = () => {
    return (
      <>
        <Header />
        <Container>
          <Outlet />
        </Container>
      </>
    );
  };

  export default Layouts;
