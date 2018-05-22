import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';

import PrimaryInput from '../../atoms/Inputs/PrimaryInput';
import SelectCountryModal from '../../organisms/SelectCountryModal/SelectCountryModal';

class SelectCountry extends Component {
  static propTypes = {
    setCountry: PropTypes.func.isRequired,
    country: PropTypes.string,
    inputType: PropTypes.oneOf(["primary", "secondary"])

  }

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };

    // binders
    this.closeModal = this.closeModal.bind(this);
  }

  // lifecycle methods
  // event hanlders
  closeModal(country) {
    const { setCountry } = this.props;
    setCountry(country);
    this.setState({ modalVisible: false });
  }
  // rendering methods
  render() {
    const { modalVisible } = this.state;
    const { country } = this.props;

    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
          <PrimaryInput
            clickable
            type={this.props.inputType}
            labelText="Country" value={country}
            onPress={() => this.setState({modalVisible: true})}/>
        </TouchableOpacity>

        <SelectCountryModal
          visible={modalVisible}
          onClose={this.closeModal}
        />
      </View>
    );
  }
}

export default SelectCountry;
