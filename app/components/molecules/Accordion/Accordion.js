import React, { Component } from 'react';
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../atoms/Icon/Icon";

import { actions as mixpanelActions } from '../../../services/mixpanel' 
import AccordionStyles from "./Accordion.styles";

class Accordion extends Component {
  static propTypes = {
    renderHeader: PropTypes.func.isRequired,
    renderContent: PropTypes.func.isRequired,
  };

  static defaultProps = {
  };

  constructor() {
    super();

    this.state = {
      isExpanded: false,
    };
  }

  render() {
    const { isExpanded } = this.state;
    const { renderHeader, renderContent } = this.props;

    const backgroundColor = { backgroundColor: isExpanded ? '#899099' : '#3D4853' };
    const iconName = isExpanded ? 'QuestionMark' : 'QuestionMarkCircle';

    return (
      <View style={AccordionStyles.wrapper}>
        <TouchableOpacity onPress={
          () => {
            if (!this.state.isExpanded) {
              mixpanelActions.estimationExplanation()
            }
            this.setState({ isExpanded: !isExpanded })}
          }
        >
          <View style={[AccordionStyles.headerWrapper, backgroundColor]}>
            { renderHeader(AccordionStyles.headerText) }

            <Icon name={iconName} fill='#FFFFFF' heigh="24" width="24" viewBox="0 0 30 30" style={{ opacity: 0.5 }}/>
          </View>
        </TouchableOpacity>

        { isExpanded ? (
          <View style={AccordionStyles.expandedWrapper}>
            <View style={AccordionStyles.expandedContent}>
              <View style={{paddingTop: 20, paddingBottom: 20, alignItems: 'center'}}>
                { renderContent(AccordionStyles.expandedText) }
              </View>
            </View>
          </View>
        ) : null}
      </View>
    )
  }
}

export default Accordion;
