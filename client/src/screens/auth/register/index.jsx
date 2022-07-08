import React, { useEffect, useState } from "react";
import { Text, Touchable, View, Pressable, ScrollView } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import tw from 'twrnc';

import Button from "../../../components/button";
import { register } from "../../../services/auth";
import Input from "../../../components/input";

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [authError,setAuthError] = useState("");

  const initialValues = {
    name: '',
    email:'',
    password: '',
    phone: '',
    nationalId: '',
    address: ''
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email("Invalid email").required('Email is required'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().length(10).required('Phone is required'),
    nationalId: Yup.string().length(16).required('National id is required'),
    address: Yup.string().required('Address is required')
  })

  const formik = useFormik({
    initialValues,
    validationSchema
  })

  const { handleChange, handleBlur, values, errors, touched } = formik;

  const handleSubmit = async () => {
    setLoading(true);
    setAuthError("");
    const res = await register(values);
    setLoading(false);
    if(!res?.success) return setAuthError(res?.message || "Something went wrong");
    navigation.navigate('Login');
  }
  

    return (
        <View style={tw`h-full  bg-white  justify-end items-center`}>
        <ScrollView style={tw`w-full`}>
        <View style={tw`h-full bg-white w-full bg-white`}>
            <View style={tw`w-full mt-14`}>
                <Text style={tw`text-center font-extrabold text-xl`}>THE VOTE</Text>
                <Text style={tw`text-center font-extrabold text-xl mt-2`}>Create Voter Account</Text>
            </View>
          
          {authError.length > 0 && <Text style={tw`mt-4 text-red-500 text-center`}>{authError}</Text>}
          <View style={tw`mt-6`}>
          <View style={tw`px-6 py-2`}>
            <Input
              placeholder="Full Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              borderColor={touched.name && errors.name ? 'red' : 'gray'}
            />
            {touched.name && errors.name 
            && (<Text style={tw`text-red-500`}>{errors.name}</Text>)}

            <View style={tw`mt-2`}>
            <Input
              placeholder="Your Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              borderColor={touched.email && errors.email ? 'red' : 'gray'}
              />
            {touched.email && errors.email && <Text style={tw`text-red-500`}>{errors.email}</Text>}
            </View>

            <View style={tw`mt-2`}>
            <Input
              placeholder="Phone Number"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              borderColor={touched.phone && errors.phone ? 'red' : 'gray'}
              />
            {touched.phone && errors.phone && <Text style={tw`text-red-500`}>{errors.phone}</Text>}
            </View>


            <View style={tw`mt-2`}>
            <Input
              placeholder="National ID"
              onChangeText={handleChange('nationalId')}
              onBlur={handleBlur('nationalId')}
              value={values.nationalId}
              borderColor={touched.nationalId && errors.nationalId ? 'red' : 'gray'}
              />
            {touched.nationalId && errors.nationalId && <Text style={tw`text-red-500`}>{errors.nationalId}</Text>}
            </View>
              

            <View style={tw`mt-2`}>
            <Input
              placeholder="Address"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              borderColor={touched.address && errors.address ? 'red' : 'gray'}
              />
            {touched.address && errors.address && <Text style={tw`text-red-500`}>{errors.address}</Text>}
            </View>

            <View style={tw`mt-2`}>
            <Input
              placeholder="Password"
              security={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              borderColor={touched.password && errors.password ? 'red' : 'gray'}
            />
            {touched.password && errors.password && <Text style={tw`text-red-500`}>{errors.password}</Text>}
            </View>

            <View style={tw`mt-4`}>
            <Button
              mode={"contained"}
              style={tw`bg-black w-full p-[4px] mt-4 rounded-[50px]`}
              onPress={handleSubmit}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <Pressable onPress={() => navigation.navigate('Login')}>
            <View style={tw`mt-2`}>
              <Text style={tw`text-xl underline text-gray-500 text-sm`}>Have account? Login</Text>
            </View>
            </Pressable>
            </View>


          </View>
          </View>
      </View>
      </ScrollView>
        </View>

    )
}

export default SignUp;