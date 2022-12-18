interface InputFieldInt {
  error: string | undefined
  func: any
  placeholder: string
}

const InputField: React.FC<InputFieldInt> = ({ error, func, placeholder }) => {
  const formClass = error ? "form-control error" : "form-control"

  return (
    <div className="mb-3">
      <input
        type="text"
        className={formClass}
        placeholder={placeholder}
        {...func}
      />
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  )
}

export default InputField