const action = (x) => ({
  compose: (f) => action(f(x)),
  produce: (f) => f(x),
});

export default action;
