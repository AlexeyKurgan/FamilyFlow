import { Container, Main } from "../shared/components/Container";
import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
