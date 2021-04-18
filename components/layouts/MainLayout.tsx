type Props = {
  children: React.ReactNode
};

const MainLayout: React.FC<Props> = ({ children }) => (
  <div className="absolute inset-0 p-10">
    {children}
  </div>
);

export default MainLayout;
