export const dieselFactors = [
  {
    text: "One-way trip",
    value: 1,
  },
  {
    text: "Round trip",
    value: 2,
  },
];

export const factorName = (value: number) => {
  switch (value) {
    case 1:
      return "One-way trip";
    case 2:
      return "Round trip";
    default:
      return "";
  }
};
