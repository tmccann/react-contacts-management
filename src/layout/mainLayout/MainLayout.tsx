import NavBar from "../../Components/navBar/NavBar";
import PageContainer from "../pagesLayout/PageContainer";
import Footer from "../../Components/footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* navbar coponent neede*/}
      <NavBar />

      {/* page container */}
      <PageContainer>
        <Outlet />
      </PageContainer>
      {/* footer component needed */}
      <Footer />
    </div>
  );
};

export default MainLayout;
