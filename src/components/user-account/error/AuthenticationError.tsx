import "./AuthenticationError.css";

interface AuthenticationErrorProps {
  message: string;
}

export function AuthenticationError({ message }: AuthenticationErrorProps) {
  return <p className="authentication-form-error-text">{message}</p>;
}
