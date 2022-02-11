import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import TextInput from './TextInput';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 15
  },
  inputField: {
    borderWidth: 2,
    borderColor: '#586069',
    padding: 5,
    margin: 5
  }
});
const RepositoryListHeader = (props) => {

  return (
    <View>
      <TextInput 
            style={styles.inputField} 
            name="filter" 
            placeholder="Search"
            onChangeText={props.setFilter}
          />
          <Picker
            selectedValue={props.pickedValue}
            onValueChange={(itemValue, itemIndex) =>         
              props.changeValues(itemValue)
            }>
            <Picker.Item label="Latest repositories" value="Latest" />
            <Picker.Item label="Highest rated repositories" value="Highest" />
            <Picker.Item label="Lowest rated repositories" value="Lowest" />
          </Picker>
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader
        setFilter={props.setFilter}
        pickedValue={props.pickedValue}
        changeValues={props.changeValues}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositoryNodes}
        ItemSeparatorComponent={this.props.ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item, index, separators }) => (
          <View style={{ backgroundColor: 'white' }}>
            <RepositoryItem repository={item}/>
          </View>
        )}
    />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [pickedValue, setPickedValue] = useState('Latest');
  const [filter, setFilter] = useState('');
  const [searchKeyword] = useDebounce(filter, 5000);
  const { repositories } = useRepositories({ orderBy, orderDirection, searchKeyword});

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  const changeValues = (value) => {
    setPickedValue(value);

    if (value.match('Latest')) {
      setOrderBy('CREATED_AT');
      setOrderDirection('DESC');
    } else if (value.match('Highest')) {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('DESC');
    } else if (value.match('Lowest')) {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('ASC');
    }
  };

  return (
    <RepositoryListContainer
      repositoryNodes={repositoryNodes}
      changeValues={changeValues}
      pickedValue={pickedValue}
      ItemSeparator={ItemSeparator}
      setFilter={setFilter}
    />
  );
};

export default RepositoryList;