export default function validate(formData) {
  let errors = {};
  if (!formData.question) {
    errors.question = 'Please Enter a Title';
  }

  if (!formData.answer) {
    errors.answer = 'Please Enter an Answer';
  }

  if (!formData.category) {
    errors.category = 'Please Choose a Category';
  }
  return errors;
}
