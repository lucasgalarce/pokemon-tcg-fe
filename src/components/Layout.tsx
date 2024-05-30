import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto flex h-screen flex-col justify-between">
      <Navbar></Navbar>
      <main className="flex h-full">{children}</main>
    </div>
  );
};

export default Layout;
