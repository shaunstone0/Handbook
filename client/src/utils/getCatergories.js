export const getCategories = (faqs) => {
  const catArray = [];
  if (faqs) {
    faqs.map((faq) => {
      return catArray.push(...faq.category);
    });
  }
  const uniqueArray = [...new Set(catArray)];
  return uniqueArray;
};
