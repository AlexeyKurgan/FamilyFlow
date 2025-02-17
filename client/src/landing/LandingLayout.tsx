import { Outlet } from "react-router-dom";
import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";
import { Main, Container } from "../shared/components/Container";

const LandingLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default LandingLayout;
