import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "../formContainer/FormContainer"; // Wrapper for the form layout
import styles from "../formStyles/FormStyles.module.css"; // Import the CSS module styles

type ContactInputProps = {
  name: string;
  email: string;
  phone: number;
  gender: "male" | "female";
};

const ContactsForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<ContactInputProps>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // formState: { errors },
  } = useForm<ContactInputProps>();

  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Form Header: Heading for the form */}
        <h2>Add new contact</h2>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className={styles.input} // Styled input field (defined in the CSS module)
          {...register("name", { required: "Name is required" })}
        />
        <p className={styles.error}>{errors.name?.message}</p>
        {/* Input field for the email of the contact */}
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          className={styles.input} // Styled input field (defined in the CSS module)
          {...register("email", { required: "Email is required" })}
        />
        <p className={styles.error}>{errors.email?.message}</p>
        {/* Input field for the phone of the contact */}
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          className={styles.input} // Styled input field (defined in the CSS module)
          {...register("phone", { required: "Phone number is required" })}
        />
        <p className={styles.error}>{errors.phone?.message}</p>
        {/* Fieldset for gender selection: Grouping radio buttons */}
        <fieldset className={styles.fieldset}>
          {/* Fieldset styling for grouping */}
          <legend>Gender: </legend>
          <div className={styles.switch}>
            {/* Flex container for radio buttons */}
            <input
              type="radio"
              id="male"
              value="male"
              {...register("gender", { required: "gender is required" })}
            />
            <label htmlFor="male" className={styles.switchLabel}>
              {/* Male radio button label */}
              Male
            </label>
            <input
              type="radio"
              id="female"
              value="female"
              {...register("gender", { required: "gender is required" })}
            />
            <label htmlFor="female" className={styles.switchLabel}>
              {/* Female radio button label */}
              Female
            </label>
          </div>
        </fieldset>
        <p className={styles.error}>{errors.gender?.message}</p>

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
  );
};

export default ContactsForm;
