interface Props {
  content: string;
}

export default function CustomDefaultTabHeading({ content }: Props) {
  return (
    <div className="custom-default-tab-header">
      <h2 className="custom-default-tab-header-title">{content}</h2>
    </div>
  );
}
