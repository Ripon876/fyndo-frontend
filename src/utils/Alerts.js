import Toast from "./ToastAlert";

const ShowError = () => {
  Toast({
    type: "error",
    icon: "error",
    title: "Something went wrong",
  });
  return <div></div>;
};

const ShowSuceess = ({ msg }) => {
  Toast({
    type: "success",
    icon: "success",
    title: msg,
  });
  return <div></div>;
};

export { ShowError, ShowSuceess };
