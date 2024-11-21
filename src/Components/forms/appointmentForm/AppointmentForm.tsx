import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormContainer from "../formContainer/FormContainer"; // Wrapper for the form layout
import styles from "../formStyles/FormStyles.module.css"; // Import the CSS module styles

const AppointmentForm = () => {
  return (
    <>
      {/* Main container that holds the form for layout and structure */}
      <FormContainer>
        <form action="submit" className={styles.form}>
          {/* Form Header: Heading for the form */}
          <h2>Book appointment</h2>

          {/* Input field for the name of the contact */}
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            className={styles.input} // Styled input field (defined in the CSS module)
            required
          />

          {/* Dropdown for selecting an option */}
          <label htmlFor="options">Options</label>
          <select
            name="contacts"
            id="contacts"
            className={styles.select} // Styled select field
            required
          >
            <option value="">please select a contact</option>
            <option value="contact1">contact 1</option>
            <option value="contact2">contact 2</option>
            <option value="contact3">contact 3</option>
          </select>

          {/* DatePicker component for selecting date */}
          <div className={styles.react_datepicker}>
            {/* Styling for the date picker wrapper */}
            <label htmlFor="date"> Select an available date</label>
            <DatePicker
              placeholderText="Select date and time"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          {/* Dropdown for selecting an option */}
          <label htmlFor="times">Select an available time</label>
          <select
            name="times"
            id="times"
            className={styles.select} // Styled select field
            required
          >
            <option value="">available times</option>
            <option value="time1">8:30</option>
            <option value="time2">9:30</option>
            <option value="ctime3">10:30</option>
          </select>

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

export default AppointmentForm;
