import React from 'react';
import { Form } from 'native-base';

const styles = {
  marginTop: 30,
}

const disabledStyles = {
  opacity: 0.5,
}

const CelFrom = (props) => {
  const formStyles = [styles];
  if (props.disabled) formStyles.push(disabledStyles);
  if (props.customStyles) formStyles.push(props.customStyles);
  return (
    <Form style={formStyles} pointerEvents={ props.disabled ? 'none' : null }>
      { props.children }
    </Form>
  )
}

export default CelFrom;
