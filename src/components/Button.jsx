export default function Button({ style, children, ...props }) {
  return (
    <button
      className={
        style ||
        "min-w-24 flex items-center justify-center font-semibold rounded-lg px-4 py-3 text-stone-300 bg-stone-800 hover:bg-stone-700 hover:text-white"
      }
      {...props}
    >
      {children}
    </button>
  );
}
