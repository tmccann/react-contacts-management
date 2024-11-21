import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "../formContainer/FormContainer"; // Wrapper for the form layout
import styles from "../formStyles/FormStyles.module.css"; // Import the CSS module styles

type Inputs = {
  title: string;
  contacts: string;
  date: string;
  time: number;
};

const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    //  formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <>
      {/* Main container that holds the form for layout and structure */}
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Form Header: Heading for the form */}
          <h2>Book appointment</h2>

          {/* Input field for the name of the contact */}
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            className={styles.input} // Styled input field (defined in the CSS module)
            {...register("title", {
              required: "title is required",
            })}
          />

          {/* Dropdown for selecting an option */}
          <label htmlFor="options">Options</label>
          <select
            id="contacts"
            className={styles.select} // Styled select field
            {...register("contacts", {
              required: "contacts is required",
            })}
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
            id="times"
            className={styles.select} // Styled select field
            {...register("time", {
              required: "time is required",
            })}
          >
            <option value="">available times</option>
            <option value="8:30">8:30</option>
            <option value="9:30">9:30</option>
            <option value="10:30">10:30</option>
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
