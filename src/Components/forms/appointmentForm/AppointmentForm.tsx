import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "../formContainer/FormContainer";
import styles from "../formStyles/FormStyles.module.css"; // Import the CSS module styles

type AppointmentInputProps = {
  title: string;
  contacts: string;
  date: Date;
  time: string;
};

let startDate: Date = new Date();

const AppointmentForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<AppointmentInputProps>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<AppointmentInputProps>();

  // const onSubmit: SubmitHandler<AppointmentInputProps> = (data) => {
  //   console.log(data); // Your custom behavior
  //   reset()
  // };

  const checkDate = (date: Date | null, field: any) => {
    const today: string = new Date().toLocaleDateString("en-GB");
    const selectedDate: string | null | undefined =
      date?.toLocaleDateString("en-GB");
    today === selectedDate
      ? console.log(today)
      : console.log(today, selectedDate);
    field.onChange(date);
  };

  const actualSubmit: SubmitHandler<AppointmentInputProps> = (data) => {
    console.log("Form data submitted: ", data); // Log the submitted data
    reset(); // Optionally reset the form after submission
  };

  return (
    <>
      {/* Main container that holds the form for layout and structure */}
      <FormContainer>
        <form
          onSubmit={handleSubmit(onSubmit || actualSubmit)}
          className={styles.form}
        >
          {/* Form Header: Heading for the form */}
          <h2>Book appointment</h2>

          {/* Input field for the name of the contact */}
          <label htmlFor="title">Title</label>
          <input
            placeholder="Enter appointment title"
            type="text"
            id="title"
            className={styles.input} // Styled input field (defined in the CSS module)
            {...register("title", {
              required: "title is required",
            })}
          />

          {errors.title && (
            // Styled error
            <p data-testid="title-error" className={styles.error}>
              {errors.title.message}
            </p>
          )}

          {/* Dropdown for selecting an option */}
          <label htmlFor="contacts">Contacts</label>
          <select
            id="contacts"
            className={styles.select} // Styled select field
            {...register("contacts", {
              required: "contact is required",
            })}
          >
            <option value="">please select a contact</option>
            <option value="contact1">contact 1</option>
            <option value="contact2">contact 2</option>
            <option value="contact3">contact 3</option>
          </select>

          {/* DatePicker component for selecting date */}
          {errors.contacts && (
            <p data-testid="contacts-error" className={styles.error}>
              {errors.contacts.message}
            </p>
          )}
          <Controller
            control={control}
            name="date"
            rules={{ required: "please select available date" }}
            render={({ field }) => (
              <div className={styles.react_datepicker}>
                {/* Styling for the date picker wrapper */}
                <label htmlFor="date"> Select an available date</label>
                <DatePicker
                  name="date"
                  id="date"
                  placeholderText="Select date"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => checkDate(date, field)}
                  selected={field.value}
                  minDate={startDate}
                />
              </div>
            )}
          />
          {errors.date && (
            <p data-testid="date-error" className={styles.error}>
              {errors.date.message}
            </p>
          )}

          {/* Dropdown for selecting an option */}
          <label htmlFor="times">Select a time</label>
          <select
            id="times"
            className={styles.select} // Styled select field
            {...register("time", {
              required: "time is required",
            })}
          >
            <option value="">available times</option>
            <option value="8">8:30</option>
            <option value="9:30">9:30</option>
            <option value="10:30">10:30</option>
          </select>
          {errors.time && (
            <p data-testid="time-error" className={styles.error}>
              {errors.time.message}
            </p>
          )}

          {/* Button container: Centers the submit button */}
          <div className={styles.position_button_center}>
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
