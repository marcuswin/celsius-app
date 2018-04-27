import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';
import {
  Button, Col, Form, Icon, Input, Item, Label, Text,
  View,
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {Image, StatusBar} from 'react-native';
import {Grid, Row} from 'react-native-easy-grid';

import {MainHeader} from '../MainHeader/MainHeader';
import ResizeStyle from './ResizeHeader.styles';

const MAX_HEIGHT = 200;

class ResizeHeader extends Component {

  static propTypes = {
    right: PropTypes.element,
    headerTitle: PropTypes.string.isRequired,
    left: PropTypes.element,
    backButton: PropTypes.bool,
  };

  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          overlayColor={'rgba(75,100,198,1)'}
          minOverlayOpacity={1}
          scrollViewBackgroundColor={'rgba(75,100,198,1)'}
          renderFixedForeground={() => (
            <Animatable.View
              style={ResizeStyle.navTitleView}
              ref={smallHeader => {
                this.smallHeader = smallHeader;
              }}
            >
              <MainHeader headerTitle={'Just a few ...'} backButton/>
            </Animatable.View>
          )}
          renderForeground={() => (
            <Animatable.View
              style={ResizeStyle.titleContainer}
              ref={bigHeader => {
                this.bigHeader = bigHeader
              }}
            >
              <Grid>
                <Row style={{height: 40}}>
                  <Col style={ResizeStyle.columnHeight}>
                    <Button title='Back' transparent onPress={this.onPressBackButton}>
                      <Icon style={ResizeStyle.backArrow} name='arrow-back'/>
                      <Text style={ResizeStyle.backButtonText}>Back</Text>
                    </Button>
                  </Col>
                  <Col style={ResizeStyle.columnHeight}>
                    <Image style={ResizeStyle.logo} source={require(
                      '../../../../assets/images/icons/celsius_symbol_white.png')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Text style={ResizeStyle.subtitle}>Just a few more details...</Text>
                </Row>
              </Grid>
            </Animatable.View>
          )}
        >
          <TriggeringView
            onHide={() => {
              this.smallHeader.fadeInUp(200);
              this.bigHeader.fadeOut(100)
            }}
            onDisplay={() => {
              this.bigHeader.fadeInUp(1000);
              this.smallHeader.fadeOut(100);
            }}
          />
          <View>
            <TriggeringView style={{paddingLeft: 40, paddingRight: 40}}>
              <Text style={ResizeStyle.description}>
                To become a Celsius member, we need a few more details from you.
              </Text>

              <Form style={ResizeStyle.signUpForm}>
                <Item floatingLabel style={ResizeStyle.formItem}>
                  <Label style={{color: 'rgba(205,226,255,1)', paddingLeft: 18}}>First Name</Label>
                  <Input style={{color: 'white'}}/>
                </Item>
                <Item floatingLabel style={ResizeStyle.formItem}>
                  <Label style={{color: 'rgba(205,226,255,1)', paddingLeft: 18}}>Last Name</Label>
                  <Input style={{color: 'white'}}/>
                </Item>
                <Item floatingLabel style={ResizeStyle.formItem}>
                  <Label style={{color: 'rgba(205,226,255,1)', paddingLeft: 18}}>Country</Label>
                  <Input style={{color: 'white'}}/>
                </Item>
                <Item floatingLabel style={ResizeStyle.formItem}>
                  <Label style={{color: 'rgba(205,226,255,1)', paddingLeft: 18}}>Phone number</Label>
                  <Input style={{color: 'white'}}/>
                </Item>
              </Form>

              <View style={ResizeStyle.submitButtonWrapper}>
                <Button rounded light block style={ResizeStyle.submitButton}>
                  <Text>I'm done</Text>
                </Button>
              </View>
            </TriggeringView>
          </View>
        </HeaderImageScrollView>
      </View>
    );
  }
}

export {ResizeHeader};
