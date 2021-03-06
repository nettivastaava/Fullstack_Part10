import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import { View, StyleSheet, Pressable } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-dom";

const initialValues = {
  username: '',
  password: '',
};

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

export const SignInContainer = ({ onSubmit}) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({  
    username: yup    
      .string()
      .required('Username is required'),  
    password: yup    
      .string()
      .required('Password is required'),
  });

  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignInForm = ({ onSubmit }) => {

  return (
    <View>
      <FormikTextInput style={styles.inputField} name="username" placeholder="Username" />      
      <FormikTextInput style={styles.inputField} name="password" placeholder="Password" secureTextEntry={true} />     
      <View style={styles.language}>
        <Pressable fontWeight="bold" onPress={onSubmit}>
          <Text color="textTab">Submit</Text>
        </Pressable>
      </View> 
    </View>
  );
};

const validationSchema = yup.object().shape({  
  username: yup    
    .string()
    .required('Username is required'),  
  password: yup    
    .string()
    .required('Password is required'),
});


const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log('FAIL', e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;