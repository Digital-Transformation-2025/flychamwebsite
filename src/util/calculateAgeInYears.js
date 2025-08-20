const calculateAgeInYears = (dob) => {
    const birth = new Date(dob);
    const today = new Date();

    const diffTime = today - birth;
    const ageInYears = diffTime / (1000 * 60 * 60 * 24 * 365);

    return ageInYears;
};
export default  calculateAgeInYears