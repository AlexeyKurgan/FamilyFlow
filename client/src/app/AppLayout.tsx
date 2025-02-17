import { Main, Container } from "../shared/components/Container";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <header>Header App Layout</header>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <footer>footer App Layout</footer>
    </>
  );
};

export default AppLayout;
