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

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [pickedValue, setPickedValue] = useState('Latest');
  const [filter, setFilter] = useState('');
  const [searchKeyword] = useDebounce(filter, 5000);
  const { repositories } = useRepositories({ orderBy, orderDirection, searchKeyword});

  console.log('FILTER ', filter);

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
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => 
        <View style={styles.picker}>
          <TextInput 
            style={styles.inputField} 
            name="filter" 
            placeholder="Search"
            onChangeText={setFilter}
          />
          <Picker
            selectedValue={pickedValue}
            onValueChange={(itemValue, itemIndex) =>         
              changeValues(itemValue)
            }>
            <Picker.Item label="Latest repositories" value="Latest" />
            <Picker.Item label="Highest rated repositories" value="Highest" />
            <Picker.Item label="Lowest rated repositories" value="Lowest" />
          </Picker>
        </View>
      }
      renderItem={({ item, index, separators }) => (
        <View style={{ backgroundColor: 'white' }}>
          <RepositoryItem repository={item}/>
        </View>
      )}
    />
  );
};

export default RepositoryList;