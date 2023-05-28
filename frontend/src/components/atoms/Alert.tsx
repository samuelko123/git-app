import { AlertProps } from "./Alert.d";

const mapping = {
  success: "bg-green-100 border-green-400 text-green-700",
  error: "bg-red-100 border-red-400 text-red-700",
};

export const Alert = ({ children, variant }: AlertProps) => {
  const color = mapping[variant];
  return (
    <div
      className={`${color} border px-4 py-3 rounded relative`}
      role="alert"
    >
      <span className="block sm:inline">{children}</span>
    </div>
  );
};
