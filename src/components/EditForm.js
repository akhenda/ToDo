import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Icon, Item, Input, Button } from 'native-base';

import styles from './styles/EditFormStyles';


class EditForm extends Component {
  render() {
    const { value, onSave, onChangeText } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Edit Note:</Text>
        <Item regular style={styles.inputContainer}>
          <Input placeholder={value} value={value} onChangeText={onChangeText} />
        </Item>
        <Button block primary iconLeft onPress={onSave} style={styles.saveButton}>
          <Icon name="ios-create-outline" />
          <Text>Save Todo</Text>
        </Button>
      </View>
    );
  }
}

EditForm.propTypes = {
  value: PropTypes.string,
  onSave: PropTypes.func,
  onChangeText: PropTypes.func,
};

export default EditForm;
