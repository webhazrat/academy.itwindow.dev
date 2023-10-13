export default function Label({ children, className, ...props }) {
  return (
    <label
      {...props}
      className={`mb-2 block ${className} text-[15px] font-medium`}
    >
      {children}
    </label>
  );
}
