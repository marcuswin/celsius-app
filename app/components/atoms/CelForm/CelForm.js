import React from 'react';
import { Form } from 'native-base';

import stylesUtil from '../../../utils/styles-util';

const styles = {
  // marginTop: 30,
}

const disabledStyles = {
  opacity: 0.5,
}

const CelForm = (props) => {
  const formStyles = [styles];
  if (props.disabled) formStyles.push(disabledStyles);
  if (props.customStyles) formStyles.push(props.customStyles);
  if (props.margin) formStyles.push(stylesUtil.getMargins(props.margin));
  return (
    <Form style={formStyles} pointerEvents={ props.disabled ? 'none' : null }>
      { props.children }
    </Form>
  )
}

export default CelForm;
