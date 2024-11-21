import FormContainer from "../formContainer/FormContainer"; // Wrapper for the form layout
import styles from "../formStyles/FormStyles.module.css"; // Import the CSS module styles

const ContactsForm = () => {
  return (
    <FormContainer>
      <form action="submit" className={styles.form}>
        {/* Form Header: Heading for the form */}
        <h2>Add new contact</h2>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input} // Styled input field (defined in the CSS module)
          required
        />
        {/* Input field for the email of the contact */}
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input} // Styled input field (defined in the CSS module)
          required
        />
        {/* Input field for the phone of the contact */}
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={styles.input} // Styled input field (defined in the CSS module)
          required
        />

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
  );
};

export default ContactsForm;
