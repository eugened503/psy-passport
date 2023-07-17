export default (arr, fn) => {
  return arr.map(([scale, total]) => ({ scale, total, desc: fn(total) }));
};
