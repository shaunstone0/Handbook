export default function validate(formData) {
  let errors = {};

  if (!formData.question) {
    errors.question = 'Title cannot be Left Blank';
  }
  if (formData.answer === '<p><br></p>') {
    errors.answer = 'Answer cannot be left blank';
  }
  if (formData.category === 'Choose One' || null || undefined) {
    errors.category = 'Category cannot be left blank';
  }
  return errors;
}
