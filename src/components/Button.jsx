function Button({ children, color, handleSubmit }) {
  const styles = {
    dark: "bg-red-700 text-white hover:bg-black hover:text-white rounded-md px-3.5 py-2.5 hover:cursor-pointer",

    light:
      "bg-blue-300 text-black hover:bg-black hover:text-white rounded-md px-3.5 py-2.5 hover:cursor-pointer",

    bright:
      "bg-blue-700 text-white hover:bg-black hover:text-white rounded-md px-3.5 py-2.5 hover:cursor-pointer",

    disabled:
      "bg-blue-700 text-white hover:bg-black hover:text-white rounded-md px-3.5 py-2.5 disabled:opacity-50",
  };

  return (
    <button
      type="submit"
      className={`${styles[color]} p-2`}
      onClick={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit();
        }
      }}
      disabled={color === "disabled"}
    >
      {children}
    </button>
  );
}

export default Button;
