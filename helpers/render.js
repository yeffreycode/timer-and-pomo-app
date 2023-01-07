export const renderComponent = (component, n) => {
  let txt = component().txt;
  render(txt, n);
  component().setActions();
};

export const render = (txt, n) => {
  n.innerHTML = "";
  n.innerHTML = txt;
};
