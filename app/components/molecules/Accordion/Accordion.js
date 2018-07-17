import React, { Component } from 'react';
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Icon from "../../atoms/Icon/Icon";
import { actions as mixpanelActions } from '../../../services/mixpanel'
import AccordionStyles from "./Accordion.styles";
import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Accordion extends Component {
  static propTypes = {
    renderHeader: PropTypes.func.isRequired,
    renderContent: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  };

  static defaultProps = {
  };

  constructor() {
    super();

    this.state = {
      isExpanded: false,
    };
  }

  expandAccordion = () => {
    const { isExpanded } = this.state;
    const { actions, name } = this.props;
    if (!isExpanded) {
      mixpanelActions.estimationExplanation()
    }
    if (!isExpanded) actions.scrollTo({ accordion: name })
    this.setState({ isExpanded: !isExpanded })
  }

  saveLayout = () => {
    const { name, actions } = this.props;
    this.accordion.measureInWindow((x, y, width, height) => {
      actions.setScrollElementLayout(`${name}Accordion`, { x, y, width, height });
    })
  }

  render() {
    const { isExpanded } = this.state;
    const { renderHeader, renderContent } = this.props;

    const backgroundColor = { backgroundColor: isExpanded ? '#899099' : '#3D4853' };
    const iconName = isExpanded ? 'QuestionMark' : 'QuestionMarkCircle';

    return (
      <View
        style={AccordionStyles.wrapper}
        onLayout={this.saveLayout}
        ref={el => { this.accordion = el }}
      >
        <TouchableOpacity onPress={this.expandAccordion}>
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
