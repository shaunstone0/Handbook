export default function validate(formData) {
  let errors = {};

  if (!formData.lastname) {
    errors.lastname = 'Last Name is required';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  }

  return errors;
}
