import "./TextField.css"

const TextField = ({tipo, placeholder}) => {
  return (
    <input type={tipo} placeholder={placeholder} />
  )
}

export default TextField;