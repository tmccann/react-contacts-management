import styles from "./FormContainer.module.css";
type FormContainerProps = {
  children: React.ReactNode;
};
const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return <div className={styles.form_container}>{children}</div>;
};

export default FormContainer;
