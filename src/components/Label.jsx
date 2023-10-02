export default function Label({ children, className, ...props }) {
  return (
    <label {...props} className={`mb-2 block ${className}`}>
      {children}
    </label>
  );
}
