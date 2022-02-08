import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 15
  }
});

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const [order, setOrder] = useState();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => 
        <View style={styles.picker}
        >
          <Picker
            selectedValue={order}
            onValueChange={(itemValue, itemIndex) =>
              setOrder(itemValue)
            }>
            <Picker.Item label="Latest repositories" value="CREATED AT" />
            <Picker.Item label="Highest rated repositories" value="DESC" />
            <Picker.Item label="Lowest rated repositories" value="ASC" />
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