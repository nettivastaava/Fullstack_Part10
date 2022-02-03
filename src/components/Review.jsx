import React, { useEffect} from "react";
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import { View, StyleSheet, Pressable } from 'react-native';
import * as yup from 'yup';
import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
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


const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput style={styles.inputField} name="ownerName" placeholder="OwnerName" />      
      <FormikTextInput style={styles.inputField} name="repositoryName" placeholder="RepositoryName" />  
      <FormikTextInput style={styles.inputField} name="rating" placeholder="Rating" />  
      <FormikTextInput style={styles.inputField} name="text" placeholder="Text" multiline={true} /> 
      <View style={styles.submit}>
        <Pressable onPress={onSubmit}>
          <Text color ="textTab" fontWeight="bold">Submit</Text>
        </Pressable>
      </View> 
    </View>
  );
};

const validationSchema = yup.object().shape({  
  ownerName: yup    
    .string()
    .required('Owner name is required'),  
  repositoryName: yup    
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .integer()
    .min(0)
    .max(100)
    .required('Repository rating is required'),
  text: yup
    .string()
});

const Review = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  useEffect(() => {  
    if (result.data) {     
      const repo = result.data.createReview.repositoryId;
      history.push(`/${repo}`);
    }  
  }, [result.data]);

  const onSubmit = async (values) => {
    const repositoryName = values.repositoryName;
    const ownerName = values.ownerName;
    const rating = parseInt(values.rating);
    const text = values.text;

    try {
      console.log('oi');
      await mutate({ variables: { repositoryName, ownerName, rating, text } });
    } catch (e) {
      console.log('FAIL', e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default Review;