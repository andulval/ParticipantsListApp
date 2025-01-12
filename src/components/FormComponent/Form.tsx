import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Participant } from "../../utils/interfaces/interfaces";
import { ReactComponent as ErrorSvg } from '../../assets/error.svg';
import { ReactComponent as CalendarSvg } from '../../assets/calendar.svg';
import './Form.styles.scss';

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
      <div className="container">
        <div className="row gap-40">
            {/* Name Field */}
            <div className="col-12 c-form-group">
            <label htmlFor="name">Name *</label>
            <div className="c-input-wrapper">
                <input
                id="name"
                type="text"
                {...register("name", validationRules.name)}
                placeholder="Enter name"
                className={`c-form-control ${errors.name ? "error" : ""}`}
                />
                {errors.name && (
                <span className="error-icon">
                    <ErrorSvg />
                </span>
                )}
            </div>
            {errors.name && (
                <small className="c-text-danger">{errors.name.message}</small>
            )}
            </div>

            {/* Email Field */}
            <div className="col-12 c-form-group">
            <label htmlFor="email">Email *</label>
            <div className="c-input-wrapper">
                <input
                id="email"
                type="email"
                {...register("email", validationRules.email)}
                placeholder="Enter email"
                className={`c-form-control ${errors.email ? "error" : ""}`}
                />
                {errors.email && (
                <span className="error-icon">
                    <ErrorSvg />
                </span>
                )}
            </div>
            {errors.email && (
                <small className="c-text-danger">{errors.email.message}</small>
            )}
            </div>

            {/* Work Start and Work End Fields */}
            <div className="col-md-6 c-form-group">
  <label htmlFor="workStart">Work Start *</label>
  <div className="c-input-wrapper">
    <input
      id="workStart"
      type="date"
      {...register("workStart", validationRules.workStart)}
      className={`c-form-control ${errors.workStart ? "error" : ""}`}
    />
    <span
      className="custom-calendar-icon"
      onClick={() => document.getElementById("workStart")?.focus()} // Trigger the native picker
    >
      <img src="/path-to-your-calendar-icon.svg" alt="Calendar Icon" />
    </span>
    {errors.workStart && (
      <span className="error-icon">
        <ErrorSvg />
      </span>
    )}
  </div>
  {errors.workStart && (
    <small className="c-text-danger">{errors.workStart.message}</small>
  )}
</div>

            <div className="col-md-6 c-form-group">
            <label htmlFor="workEnd">Work End *</label>
            <div className="c-input-wrapper">
                <input
                id="workEnd"
                type="date"
                {...register("workEnd", validationRules.workEnd)}
                className={`c-form-control ${errors.workEnd ? "error" : ""}`}
                />
                {errors.workEnd && (
                <span className="error-icon">
                    <ErrorSvg />
                </span>
                )}
            </div>
            {errors.workEnd && (
                <small className="c-text-danger">{errors.workEnd.message}</small>
            )}
            </div>

            {/* Submit Button */}
            <div className="col-12">
            <button className="btn__black btn__submit" type="submit">
                Submit
            </button>
            </div>
        </div>
      </div>
    </form>
  );
};
