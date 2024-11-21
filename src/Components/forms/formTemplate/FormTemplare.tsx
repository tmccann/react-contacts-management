import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormContainer from "../formContainer/FormContainer"; // Wrapper for the form layout
import styles from "../formStyles/FormStyles.module.css"; // Import the CSS module styles

const FormTemplate = () => {
  return (
    <>
      {/* Main container that holds the form for layout and structure */}
      <FormContainer>
        <form action="submit" className={styles.form}>
          {/* Form Header: Heading for the form */}
          <h2>Add new contact</h2>

          {/* Input field for the name of the contact */}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input} // Styled input field (defined in the CSS module)
            required
          />

          {/* Dropdown for selecting an option */}
          <label htmlFor="options">Options</label>
          <select
            name="options"
            id="options"
            className={styles.select} // Styled select field
            required
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          {/* Fieldset for gender selection: Grouping radio buttons */}
          <fieldset className={styles.fieldset}>
            {/* Fieldset styling for grouping */}
            <legend>Gender: </legend>
            <div className={styles.switch}>
              {/* Flex container for radio buttons */}
              <input type="radio" id="male" value="male" name="gender" />
              <label htmlFor="male" className={styles.switchLabel}>
                {/* Male radio button label */}
                Male
              </label>
              <input type="radio" id="female" value="female" name="gender" />
              <label htmlFor="female" className={styles.switchLabel}>
                {/* Female radio button label */}
                Female
              </label>
            </div>
          </fieldset>

          {/* DatePicker component for selecting date */}
          <div className={styles.react_datepicker}>
            {/* Styling for the date picker wrapper */}
            <DatePicker
              placeholderText="Select date and time"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          {/* Button container: Centers the submit button */}
          <div className={styles.positon_button_center}>
            {/* Flexbox container for button centering */}
            <button type="submit" className={styles.button}>
              {/* Submit button styling */}
              Submit
            </button>
          </div>
        </form>
      </FormContainer>
    </>
  );
};

export default FormTemplate;
