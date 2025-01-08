import React from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { Participant  } from "../../utils/interfaces/interfaces";

interface FormProps {
    participant: Participant;
}

// Define the shape of the form inputs
interface FormData {
name: string;
email: string;
workStart: string; 
workEnd: string;
};

  export const Form: React.FC<FormProps> = ({ participant }) => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<FormData>({ mode: "onChange" });

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
        }
      }, 
    },
      workEnd: {
        required: "Work end date is required",
        validate:{
            afterWorkStart: (value : string) =>{
                const workStartValue = watch("workStart");
                if (!workStartValue || new Date(value) <= new Date(workStartValue)) {
                    return "Work end must be after work start";
                  }
                  return true; // Valid case
            }
          },
      },
    };

    // Form submission handler
    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        const updatedData = {
            ...participant, 
            ...formData, 
            workStart: new Date(formData.workStart).toISOString(), // Converts workStart to 'YYYY-MM-DDT00:00Z'
            workEnd: new Date(formData.workEnd).toISOString(),     // Converts workEnd to 'YYYY-MM-DDT00:00Z'
        }
        console.log("FORM SUBMITTED:", updatedData);
        try {
            const response = await fetch(`http://localhost:3001/participants/${participant.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json", // Corrected header (Content-Type)
                },
                body: JSON.stringify(updatedData), // Send the updated data
              });
            
        } catch (error) {
            console.error("Error occurred while updating:", error);
        }
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", validationRules.name)}
            defaultValue={participant.name}
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
            defaultValue={participant.email}
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
          defaultValue={new Date(participant.workStart).toISOString().split("T")[0]}
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
          defaultValue={new Date(participant.workEnd).toISOString().split("T")[0]} 
        />
        {errors.workEnd && <small className="text-danger">{errors.workEnd.message}</small>}
      </div>
  
        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    );
  };
