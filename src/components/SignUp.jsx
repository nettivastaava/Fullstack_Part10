import React, { useEffect } from "react";
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import { View, StyleSheet, Pressable } from 'react-native';
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import * as yup from 'yup';
import { CREATE_USER } from "../graphql/mutations";

const initialValues = {
  usernameField: '',
  passwordField: '',
  passwordConf: ''
};

const styles = StyleSheet.create({
  submit: {
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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput style={styles.inputField} name="usernameField" placeholder="Username" />      
      <FormikTextInput style={styles.inputField} name="passwordField" placeholder="Password" secureTextEntry={true} />  
      <FormikTextInput style={styles.inputField} name="passwordConf" placeholder="Password confirmation" secureTextEntry={true} />  
      <View style={styles.submit}>
        <Pressable onPress={onSubmit}>
          <Text color ="textTab" fontWeight="bold">Submit</Text>
        </Pressable>
      </View> 
    </View>
  );
};

const validationSchema = yup.object().shape({  
  usernameField: yup    
    .string()
    .required('Username is required'),  
  passwordField: yup    
    .string()
    .required('Password is required'),
  passwordConf: yup
    .string()
    .oneOf([yup.ref('passwordField'), null], "Passwords don't match")
    .required('Please, confirm your password')
});

const SignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const history = useHistory();

  useEffect(() => {
    if (result.data) {
      history.push('/signin');
    }
  }, [result.data]);

  const onSubmit = async (values) => {
    const username = values.usernameField;
    const password = values.passwordField;

    try {
      console.log('sho');
      await mutate({ variables: { username, password } });
    } catch (e) {
      console.log('FAIL', e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;