import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, Animated } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { connect } from 'react-redux';

import { toDosFetch, editToDo, deleteToDo } from '../actions';
import ActivitySpinner from '../components/ActivitySpinner';

import styles from './styles/ToDosStyles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


class ToDos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      empty: false,
      loading: true,
    };
    this.data = [];
  }

  componentWillMount() {
    this.props.toDosFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextProps.todos !== this.props.todos)
      && (nextState.data !== this.state.data)
    );
  }

  createDataSource(props) {
    const data = [];

    if (props.todos !== null && props.todos !== 'undefined') {
      this.setState({ loading: false });
      Object.keys(props.todos).forEach((id) => {
        data.push({
          id,
          todo: props.todos[id].todo,
          starred: props.todos[id].starred,
          completed: props.todos[id].completed,
        });
      });
    }

    const filteredData = data.filter((item) => {
      if (this.props.page === 'home') {
        return true;
      } else if (this.props.page === 'active' && !item.completed) {
        return true;
      } else if (this.props.page === 'completed' && item.completed) {
        return true;
      } else if (this.props.page === 'starred' && item.starred) {
        return true;
      }

      return false;
    });

    this.setState({ data: filteredData, empty: filteredData.length === 0 });
  }
  
  updateToDo(item, field, value) {
    this.props.editToDo({ ...item, [field]: value });
  }
  
  removeToDo(key) {
    this.props.deleteToDo(key);
  }
  
  renderIcon(check, name, style, action) {
    return (
      <TouchableOpacity onPress={action}>
        <Icon name={check ? `ios-${name}` : `ios-${name}-outline`} style={style} />
      </TouchableOpacity>
    );
  }
  
  renderHeader() {
    return <View style={styles.spacer} />;
  }

  renderItem(item) {
    const { completed, starred } = item;
    const { itemListLeftIcon, itemListRightIcon } = styles;

    return (
      <View style={styles.itemList}>
        {this.renderIcon(
          completed,
          'checkmark-circle',
          itemListLeftIcon,
          () => this.updateToDo(item, 'completed', !completed),
        )}
        <Text style={styles.itemListText}>{item.todo}</Text>
        {this.renderIcon(
          starred,
          'star',
          itemListRightIcon,
          () => this.updateToDo(item, 'starred', !starred),
        )}
        {this.renderIcon(
          true,
          'trash-outline',
          itemListRightIcon,
          () => this.removeToDo(item.id),
        )}
      </View>
    );
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }
  
  renderFooter() {
    return <View style={styles.spacer} />;
  }

  render() {
    const { data, empty, loading } = this.state;

    if (data.length > 0) {
      return (
        <Animated.ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={5}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.props.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          <AnimatedFlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => this.renderItem(item)}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            style={[styles.content]}
          />
        </Animated.ScrollView>
      );
    } else if (empty && !loading) {
      const section = this.props.page !== 'home' ? ` ${this.props.page} ` : ' ';

      return <Text style={styles.emptySection}>{`You don't have any${section}todos.`}</Text>;
    }

    return (
      <ActivitySpinner size={50} />
    );
  }
}

ToDos.propTypes = {
  scrollY: PropTypes.object.isRequired,
  todos: PropTypes.object,
  page: PropTypes.string.isRequired,
  toDosFetch: PropTypes.func.isRequired,
  editToDo: PropTypes.func,
  deleteToDo: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos.notes,
  };
};

export default connect(mapStateToProps, { toDosFetch, editToDo, deleteToDo })(ToDos);
