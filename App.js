import * as React from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';

import List from './components/List';

export default function App() {
  const [foods, setFoods] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);

  const getData = async (reset) => {
    setIsLoading(true);
    try {
      let ft = await fetch(`https://dev-dummy-api.jelantah.org/api/foods/get?page=${reset ? 1 : page + 1}`);
      let json = await ft.json()
      if (json.success) {
        const {data} = json;
        setPage(data.current_page);
        if (reset) {
          setFoods(data.data)
        } else {
          setFoods([...foods, ...data.data])
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getData(true);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <List item={item} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              getData(true);
            }}
          />
        }
        onEndReached={() => getData()}
      />
      {isLoading && (
        <View style={styles.overlay}>
          <View style={styles.center}>
            <View style={styles.innerCenter}>
              <ActivityIndicator
                color="blue"
                size="large"
                style={{}}
              />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    backgroundColor: '#ecf0f1'
  },
  center: {
    justifyContent: 'center',
    backgroundColor: '#EEEEEE' + 'f6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8
  },
  innerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E0E0E0' + '7f',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    // color: ,
    letterSpacing: 1
  }
});
