interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}
export default function TextInput(props: Props) {
  return (
    <div className="form-control w-full max-w-xs my-2">
      {props.label && (
        <label className="label">
          <span className="label-text">{props.label}</span>
        </label>
      )}
      <input {...props} className={`${props.className} ${props.error && 'border border-red-500'}`}/>
      { props.error && (
        <label className="label">
          <span className="label-text-alt text-red-500">{props?.error}</span>
        </label>
      )}
    </div>
  );
}
