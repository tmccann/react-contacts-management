import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormContainer from "../formContainer/FormContainer";
import styles from "../formStyles/FormStyles.module.css";

const ContactsForm = () => {
  return (
    <>
      <FormContainer>
        <form action="submit" className={styles.form}>
          <h2>Add new contact</h2>
          <label htmlFor="name">Name</label>
          <input type="text" />
          <label htmlFor="options">Options</label>
          <select name="options" id="options">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          <fieldset className={styles.fieldset}>
            <legend>Gender: </legend>
            <div className={styles.switch}>
              <input type="radio" id="male" value="male" name="gender" />
              <label htmlFor="male" className={styles.switchLabel}>
                Male
              </label>

              <input type="radio" id="female" value="female" name="gender" />
              <label htmlFor="female" className={styles.switchLabel}>
                Female
              </label>
            </div>
          </fieldset>
          <div className={styles.react_datepicker}>
            <DatePicker
              placeholderText="Select date and time"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className={styles.positon_button_center}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </FormContainer>
    </>
  );
};

export default ContactsForm;
