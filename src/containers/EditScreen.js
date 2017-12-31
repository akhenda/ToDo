import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { noteChanged, saveToDo } from '../actions';

import { Colors } from '../theme';
import EditForm from '../components/EditForm';
import styles from './styles/EditScreenStyles';

class EditScreen extends Component {
  onChangeText(text) {
    this.props.noteChanged(text);
  }
  
  onSave() {
    console.log('Our Text: ', this.props.note);
    const todo = this.props.note;
    const completed = false;
    const starred = false;
    this.props.saveToDo({ todo, completed, starred });
  }

  render() {
    const { note } = this.props;
    return (
      <Container style={styles.container}>
        <StatusBar translucent={false} backgroundColor={Colors.secondaryTransparent} />
        <EditForm
          value={note}
          onSave={() => this.onSave()}
          onChangeText={text => this.onChangeText(text)}
        />
      </Container>
    );
  }
}

EditScreen.propTypes = {
  note: PropTypes.string,
  noteChanged: PropTypes.func,
  saveToDo: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    note: state.todos.note,
  };
};

export default connect(mapStateToProps, { noteChanged, saveToDo })(EditScreen);
