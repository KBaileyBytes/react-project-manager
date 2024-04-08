export default function Label({ children, ...props }) {
  return (
    <label
      className="block uppercase font-bold text-stone-600 pb-2 pt-4"
      {...props}
    >
      {children}
    </label>
  );
}
