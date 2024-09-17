export default function Button({ children, type }) {
  return (
    <button
      type={type}
      className="p-2 bg-yellow-700 rounded-[24px] px-10 shadow-xl"
    >
      {children}
    </button>
  );
}
