import NumberFormat from "react-number-format";

export const FloatNumbers = (props) => {
  const { inputRef, onChange,...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      decimalSeparator=","
      // isNumericString
    />
  );
}

export const PhoneNumberFormat = (props) => {
  const { inputRef, onChange,...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}

      format="### ### ###"
      mask="_"
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
    />
  );
}

export const BankFormat = (props) => {
  const { inputRef, onChange,...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}

      format="## #### #### #### #### #### ####"
      mask="_"
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      // isNumericString
    />
  );
}

export const NipFormat = (props) => {
  const { inputRef, onChange,...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}

      format="# # # # # # # # # #"
      mask="_"
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
    />
  );
}

export const PostalCodeFormat = (props) => {
  const { inputRef, onChange,...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}

      format="##-###"
      mask="_"
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
    />
  );
}