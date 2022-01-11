import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import { View, StyleSheet, Pressable } from 'react-native';


const styles = StyleSheet.create({
  language: {
    backgroundColor: '#0366d6',
    padding: 5,
    alignItems: 'center',
    margin: 5
  },
  inputField: {
    borderWidth: 2,
    borderColor: '#586069',
    padding: 5,
    margin: 5
  }
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput style={styles.inputField} name="username" placeholder="Username" />      
      <FormikTextInput style={styles.inputField} name="password" placeholder="Password" secureTextEntry={true} />     
      <View style={styles.language}>
        <Pressable fontWeight="bold" onPress={onSubmit}>
          <Text color="textTab">Sign in</Text>
        </Pressable>
      </View> 
    </View>
  );
};

const SignIn = () => {

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;