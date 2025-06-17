import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFormStore from "@/store/useFormStore";

const Reading = () => {
  const navigate = useNavigate();
  const { formFilled, setError } = useFormStore();

  useEffect(() => {
    if (!formFilled) {
      setError("Please fill the form before accessing resources.");
      navigate("/");
    }
  }, [formFilled, navigate, setError]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Reading Resources</h1>
      <p>...content goes here...</p>
    </div>
  );
};

export default Reading;
