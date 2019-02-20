import React from 'react';
import { View, TextInput, Text, Dimensions } from 'react-native';

import testUtil from "../../../utils/test-util";

import CelTextAreaStyle from "./CelTextArea.styles";
import Separator from '../Separator/Separator';
import Card from '../../atoms/Card/Card';

const { height } = Dimensions.get('window');

const CelTextArea = (props) => {
  const style = CelTextAreaStyle(props.theme)
  return (
    <View style={style.container}>
      <Card style={{ maxHeight: '50' }} padding="0 0 0 0">
        <View style={{ paddingVertical: 20, paddingHorizontal: 20, }}>
          <TextInput
            style={{ height: height * 0.3 }}
            textAlignVertical='top'
            multiline
            numberOfLines={10}
            placeholder="Note(optional)"
            placeholderTextColor="#737A82"
            autoCapitalize='sentences'
          />
        </View>
        <Separator
          color='#737A82'
        />
        <View style={{ paddingVertical: 30, paaddingHorizontal: 20}}>
          <Text> EMOJI </Text>
        </View>

      </Card>
    </View>
  )
}

export default testUtil.hookComponent(CelTextArea);
