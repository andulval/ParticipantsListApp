import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Participant } from "../../utils/interfaces/interfaces";
import { ReactComponent as ErrorIcon } from '../../assets/error.svg';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';
import './Form.styles.scss';

interface FormProps {
  participant?: Participant;
  submitHandler: SubmitHandler<FormData>;
}

interface FormData {
  name: string;
  email: string;
  workStart: string;
  workEnd: string;
}

const formatDateToCustomISO = (date: Date) => {
  return date.toISOString().split(".")[0] + "Z";
};

export const Form: React.FC<FormProps> = ({ participant, submitHandler }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
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
    name: { required: "This field is required" },
    email: {
      required: "This field is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Invalid email address",
      },
    },
    workStart: {
      required: "This field is required"
    },
    workEnd: {
      required: "This field is required",
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

  const workStartValue = watch("workStart");

  useEffect(() => {
    if (workStartValue) {
      const workEndValue = watch("workEnd");
      if (workEndValue) {
        const isValid = new Date(workEndValue) > new Date(workStartValue);
        if (!isValid) {
          setError("workEnd", { type: "manual", message: "Work end must be after work start" });
        } else {
          clearErrors("workEnd");
        }
      }
    }
  }, [workStartValue, watch, setError, clearErrors]);

  const openCalendar = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input && typeof input.showPicker === "function") {
      input.showPicker();
    } else if (input) {
      input.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} aria-labelledby="formTitle">
      <div className="container px-0">
        <div className="row gap-40v">
          <div className="col-md-12 c-form-group">
            <label htmlFor="name">Name *</label>
            <div className="c-input-wrapper">
              <input
                id="name"
                type="text"
                {...register("name", validationRules.name)}
                placeholder="Enter name"
                className={`c-form-control ${errors.name ? "error" : ""}`}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby="nameError"
              />
              {errors.name && (
                <span className="error-icon" role="alert" id="nameError">
                  <ErrorIcon />
                </span>
              )}
            </div>
            {errors.name && <small className="c-text-danger" id="nameError">{errors.name.message}</small>}
          </div>

          <div className="col-md-12 c-form-group">
            <label htmlFor="email">Email *</label>
            <div className="c-input-wrapper">
              <input
                id="email"
                type="email"
                {...register("email", validationRules.email)}
                placeholder="Enter email"
                className={`c-form-control ${errors.email ? "error" : ""}`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="emailError"
              />
              {errors.email && (
                <span className="error-icon" role="alert" id="emailError">
                  <ErrorIcon />
                </span>
              )}
            </div>
            {errors.email && <small className="c-text-danger" id="emailError">{errors.email.message}</small>}
          </div>

          <div className="col-md-6">
            <div className=" c-form-group">
              <label htmlFor="workStart">Work Start *</label>
              <div className={`c-input-wrapper c-date-input ${errors.workStart ? "error" : ""}`}>
                <input
                  id="workStart"
                  type="date"
                  {...register("workStart", validationRules.workStart)}
                  className={`c-form-control c-form-control-date ${errors.workStart ? "error" : ""}`}
                  aria-invalid={errors.workStart ? "true" : "false"}
                  aria-describedby="workStartError"
                />
                <button
                  type="button"
                  className="calendar-btn"
                  onClick={() => openCalendar("workStart")}
                  aria-label="Open calendar for work start"
                >
                  <CalendarIcon />
                </button>
                {errors.workStart && (
                  <span className="error-icon" role="alert" id="workStartError">
                    <ErrorIcon />
                  </span>
                )}
              </div>
              {errors.workStart && (
                <small className="c-text-danger" id="workStartError">{errors.workStart.message}</small>
              )}
            </div>
          </div>

          <div className="col-md-6 c-form-group">
            <label htmlFor="workEnd">Work End *</label>
            <div className={`c-input-wrapper c-date-input ${errors.workEnd ? "error" : ""}`}>
              <input
                id="workEnd"
                type="date"
                {...register("workEnd", validationRules.workEnd)}
                className={`c-form-control c-form-control-date ${errors.workEnd ? "error" : ""}`}
                aria-invalid={errors.workEnd ? "true" : "false"}
                aria-describedby="workEndError"
              />
              <button
                type="button"
                className="calendar-btn"
                onClick={() => openCalendar("workEnd")}
                aria-label="Open calendar for work end"
              >
                <CalendarIcon />
              </button>
              {errors.workEnd && (
                <span className="error-icon" role="alert" id="workEndError">
                  <ErrorIcon />
                </span>
              )}
            </div>
            {errors.workEnd && (
              <small className="c-text-danger" id="workEndError">{errors.workEnd.message}</small>
            )}
          </div>

          <div className="col-md-6">
            <button className="btn__black btn__submit" type="submit" aria-live="polite">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
