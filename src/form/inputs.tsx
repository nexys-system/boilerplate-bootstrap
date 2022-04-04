import React from "react";

export const getClassName = (errors?: string[]): string => {
  const isInvalid: boolean = !!errors;

  const classes = ["form-control"]; //

  if (isInvalid) {
    classes.push("is-invalid");
  }

  return classes.join(" ");
};

interface InputGenericProp<A> {
  value?: A;
  onChange: (v: A) => void;
  errors?: string[];
  disabled?: boolean;
}

export const InputWrapper = ({
  label,
  children,
  errors,
}: {
  label?: string;
  children: JSX.Element;
  errors?: string[];
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      {children}
      {errors && (
        <div id="validationServer03Feedback" className="invalid-feedback">
          {errors[0]}
        </div>
      )}
    </div>
  );
};

export const Input = ({
  onChange,
  errors,
  disabled,
  value,
}: InputGenericProp<string>) => (
  <input
    className={getClassName(errors)}
    type={"text"}
    value={value}
    onChange={(v) => onChange(v.target.value)}
    disabled={disabled}
  />
);

export const Textarea = ({
  onChange,
  errors,
  disabled,
  value,
}: InputGenericProp<string>) => (
  <textarea
    className={getClassName(errors)}
    value={value}
    onChange={(v) => onChange(v.target.value)}
    disabled={disabled}
  />
);

export const SelectEnum = <A extends number | string>({
  onChange,
  options,
  value,
  errors,
  disabled,
}: {
  options: { id: A; name: string }[];
  value?: A;
} & InputGenericProp<A>) => (
  <select
    className={getClassName(errors)}
    // handle select null again
    onChange={(v) => onChange(Number(v.target.value) as any as A)}
    disabled={disabled}
  >
    <option></option>
    {options.map(({ id, name }, i) => (
      <option key={i} defaultValue={value} value={id}>
        {name}
      </option>
    ))}
  </select>
);
