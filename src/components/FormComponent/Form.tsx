import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Participant } from "../../utils/interfaces/interfaces";

interface FormProps {
  participant?: Participant; // Optional participant for editing
  submitHandler: SubmitHandler<FormData>; // Custom submit handler
}

// Define the shape of the form inputs (no id here)
interface FormData {
  name: string;
  email: string;
  workStart: string;
  workEnd: string;
}

const formatDateToCustomISO = (date: Date) => {
  return date.toISOString().split(".")[0] + "Z"; // Remove milliseconds and keep only "T00:00Z"
};

export const Form: React.FC<FormProps> = ({ participant, submitHandler }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: participant?.name || "",
      email: participant?.email || "",
      workStart: participant?.workStart
        ? new Date(participant.workStart).toISOString().split("T")[0]
        : "",
      workEnd: participant?.workEnd
        ? new Date(participant.workEnd).toISOString().split("T")[0]
        : "",
    },
  });

  // Validation rules
  const validationRules = {
    name: { required: "Name cannot be blank" },
    email: {
      required: "Email cannot be blank",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Invalid email address",
      },
    },
    workStart: {
      required: "Work start date is required",
      validate: {
        beforeWorkEnd: (value: string) => {
          const workEndValue = watch("workEnd");
          if (!workEndValue || new Date(value) >= new Date(workEndValue)) {
            return "Work start must be before work end";
          }
          return true;
        },
      },
    },
    workEnd: {
      required: "Work end date is required",
      validate: {
        afterWorkStart: (value: string) => {
          const workStartValue = watch("workStart");
          if (!workStartValue || new Date(value) <= new Date(workStartValue)) {
            return "Work end must be after work start";
          }
          return true;
        },
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {/* Name Field */}
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register("name", validationRules.name)}
          placeholder="Enter name"
        />
        {errors.name && <small className="text-danger">{errors.name.message}</small>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", validationRules.email)}
          placeholder="Enter email"
        />
        {errors.email && <small className="text-danger">{errors.email.message}</small>}
      </div>

      {/* Work Start Field */}
      <div>
        <label htmlFor="workStart">Work Start</label>
        <input
          id="workStart"
          type="date"
          {...register("workStart", validationRules.workStart)}
          placeholder="YYYY-MM-DD"
        />
        {errors.workStart && <small className="text-danger">{errors.workStart.message}</small>}
      </div>

      {/* Work End Field */}
      <div>
        <label htmlFor="workEnd">Work End</label>
        <input
          id="workEnd"
          type="date"
          {...register("workEnd", validationRules.workEnd)}
          placeholder="YYYY-MM-DD"
        />
        {errors.workEnd && <small className="text-danger">{errors.workEnd.message}</small>}
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};
