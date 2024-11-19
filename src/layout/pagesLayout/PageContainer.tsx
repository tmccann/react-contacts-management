import style from "./PageContainer.module.css";

// `React.ReactNode` ensures the `children` prop can accept anything React can render: elements, strings, numbers, fragments, null, etc.
type PageContainerProps = {
  children: React.ReactNode; // Accepts React children
};

// React.FC automatically includes typing for `children` and adds basic prop type checking.
// Here, we explicitly define the type for clarity and to enforce that `PageContainer` should accept `children`.
const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default PageContainer;
