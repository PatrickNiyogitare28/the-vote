import React, { useEffect, useState } from 'react'
import { View, Text, Pressable} from 'react-native'
import * as SecureStore from  'expo-secure-store'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'

const AppNav = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const getUserProfile = async () => {
        const profile = JSON.parse(await SecureStore.getItemAsync('profile'))
        setName(profile?.name)
    }
    useEffect(() => {
        getUserProfile();
    },[])
    
    const handleLogout = () => {
        SecureStore.deleteItemAsync('token')
        navigation.navigate('Login')
    }
    return (
        <View style={tw`w-full justify-end py-2  bg-white shadow h-[10%]`}>
            <View style={tw`flex-row justify-between w-full px-2`}>
                <Pressable onPress={handleLogout}>
                <Text>Logout</Text>
                </Pressable>
                <Text style={tw`font-bold`}>{name}</Text>
            </View>
        </View>
    )
}

export default AppNav;