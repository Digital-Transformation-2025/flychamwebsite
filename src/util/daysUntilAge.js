const daysUntilAge = (dob, targetAgeYears) => {
  const birth = new Date(dob);
  const targetDate = new Date(birth.getFullYear() + targetAgeYears, birth.getMonth(), birth.getDate());
  const today = new Date();
  const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'}`;
  } else if (diffDays < 365) {
    const months = Math.ceil(diffDays / 30);
    return `${months} month${months === 1 ? '' : 's'}`;
  } else {
    const years = Math.ceil(diffDays / 365);
    return `${years} year${years === 1 ? '' : 's'}`;
  }
};

export default daysUntilAge;
