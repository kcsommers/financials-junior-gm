import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
   
  return (
    <div className="formdiv">
        <h4>Scroll and complete the form to register as a teacher!</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h4>Your Name</h4>
            <input name="name" ref={register({ required: true, maxLength: 20 })} />
            <h4>Email Address</h4>
            <input name="lastName" ref={register({ pattern: /^[A-Za-z]+$/i })} />
            <h4>School Name</h4>
            <input name="age" type="number" ref={register({ min: 18, max: 99 })} />
            <input type="submit" />
        </form>
    </div>
  );
}