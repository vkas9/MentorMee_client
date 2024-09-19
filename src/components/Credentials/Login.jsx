import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState } from 'react'
import * as Yup from "yup";
const Login = () => {

    const [loading,setLoading]=useState(false);
    const handleSubmit = async (data) => {
        // console.log("data->",data)
        // if (data.Password !== data.ConfirmPassword) {
        //   toast.error("Passwords do not match");
        //   return;
        // }
    
        // setLoading(true);
        // try {
        //   await dispatch(opt(data, navigate));
        //   setLoading(false);
        // } catch (error) {
        //   console.error("Signup failed:", error);
    
        //   toast.error("Signup failed. Please try again.");
        // } finally {
        //   setLoading(false);
        // }
      };
      const validationSchema = Yup.object().shape({
        
        Email: Yup.string().email("Invalid email").required("Email is required"),
        Password: Yup.string().required("Password is required"),
        
      });
  return (
    <div className="flex relative min-h-[calc(100vh-(61px))] items-center">
         <Formik
        initialValues={{
          FirstName: "",
          LastName: "",
          Email: "",
          Password: "",
          ConfirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form  className="absolute top-[15%] ">
          
          <div className="w-screen xs:w-full p-6 flex sm:items-center  justify-center flex-col gap-2 xs:gap-5">
          <h1 className="text-[2.5rem]  mx-2 md:text-[4em] bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-transparent font-bold text-center">
        Create  Account
      </h1>
              
        
            <div>
              <Field
                className="bg-white/10 outline-none p-3 w-full sm:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                placeholder="Enter Email"
                name="Email"
                type="email"
              />
              <ErrorMessage
                name="Email"
                component="div"
                className="text-red-400 text-sm"
              />
            </div>
            
            <div className="flex flex-col vm:flex-row justify-center gap-2 xs:gap-5 vm:gap-2 ">
              <div>
                <Field
                  className="bg-white/10 outline-none p-3 w-full sm:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                  placeholder="Enter Password"
                  name="Password"
                  type="password"
                />
                <ErrorMessage
                  name="Password"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>
             
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`bg-yellow-500 hover:bg-yellow-600 text-yellow-950 w-full sm:w-[20rem] transition-all duration-150 font-bold text-2xl ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }  active:bg-yellow-600 p-2 rounded-md mt-3  `}
            >
              {loading ? "logging... " : "Login"}
            </button>
          </div>
        </Form>
      </Formik>
      
    </div>
  )
}

export default Login
