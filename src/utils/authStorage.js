import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const rawUser = await AsyncStorage.getItem(
      `${this.namespace}:token`
    );

    return rawUser ? JSON.parse(rawUser) : null;
  };

  async setAccessToken(accessToken) {

    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(accessToken),
    );
  };

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  };
}

export default AuthStorage;