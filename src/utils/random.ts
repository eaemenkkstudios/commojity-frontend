export function randomizeArray(array: any[], min: number, max: number): any[] {
  const newArray = array.map(point => ({
    ...point,
    value: Math.random() * (max - min) + min,
  }));

  for (let i = 0; i < newArray.length; i += 1) {
    const coeficient = Math.random() * 0.5;
    const value =
      i > 0 && Math.random() <= 0.65
        ? newArray[i - 1].value +
          (coeficient - coeficient / 2) * newArray[i].value
        : newArray[i].value;
    newArray[i] = {
      ...newArray[i],
      value: Math.min(Math.max(value, min), max),
    };
  }

  return newArray;
}
