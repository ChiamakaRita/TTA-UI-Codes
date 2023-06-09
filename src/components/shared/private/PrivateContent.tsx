import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface Props {
  decisionToHide: boolean;
  content: ReactJSXElement;
}
export default function PrivateContent({ decisionToHide, content }: Props) {
  return content;
}
