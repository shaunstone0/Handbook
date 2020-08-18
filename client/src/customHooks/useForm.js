import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors, isSubmitting, callback]);

  const onSubmit = (e) => {
    if (e) e.preventDefault();
    setErrors(validate(formData));
    setIsSubmitting(true);
  };

  const onChange = (e) => {
    e.persist();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return {
    onChange,
    onSubmit,
    formData,
    errors,
    setFormData,
  };
};

export default useForm;
