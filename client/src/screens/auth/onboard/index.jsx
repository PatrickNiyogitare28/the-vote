import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import tw from 'twrnc'
import Button from '../../../components/button'
import { getProfile } from '../../../services/auth'
import AppNav from '../../../components/app-nav'
import { getAll } from '../../../services/votes'
import Candidate from '../../../components/candidate'

const Onboard = ({ navigation }) => {
  const [name, setName] = useState('')
  const [candidates, setCandidates] = useState([])

  const getUserProfile = async () => {
    const profile = JSON.parse(await SecureStore.getItemAsync('profile'))
    setName(profile?.name)
  }
  useEffect(() => {
    getUserProfile();
    getAllCandidates();
  }, [])

  const getAllCandidates = async () => {
    const res = await getAll();
    if(res?.success){
      setCandidates(res?.data)
    }
  }

  const handleLogout = () => {
    SecureStore.deleteItemAsync('token')
    navigation.navigate('Login')
  }



  return (
    <View style={tw`h-full flex items-center`}>
      <AppNav />
      <ScrollView>
          <View style={tw`p-4`}>
             <Text style={tw`font-bold my-2 text-xl`}>Candidates</Text>
             {candidates.map((candidate, index) => (
              <Candidate key={index.toString()}  data={candidate} onReload={() => getAllCandidates()} 
               navigation={navigation}
              />
             ))}
          </View>
      </ScrollView>
    </View>
  )
}

export default Onboard
