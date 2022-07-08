import React, { useState } from 'react'
import { View, Text,  Pressable, Alert, Image } from 'react-native'
import tw from 'twrnc'
import * as SecureStore from 'expo-secure-store'
import { vote } from '../../services/votes';

const Candidate = ({ data, onReload, navigation }) => {
   
    const {
        _id,
        user: {
            name,
            address,
            phone,
        },
        gender,
        profilePicture,
        missionStatement,
        votes,
    } = data;

    const handleVote = async () => {
        const res = await vote(_id);
        if(!res?.success){
        Alert.alert(res?.message || "Something went wrong")
       }
       else{
        Alert.alert("Voted successfully")
        onReload();
       }
    }

    const renderProfile = async () => {
        await SecureStore.setItemAsync('candidateProfile', JSON.stringify(data));
        navigation.navigate('CandidateProfile');
    }

    return (
        <>
        <View style={tw`mt-2 bg-white w-full p-2 rounded-[10px] shadow`}>
            <View style={tw`flex-row justify-between`}>
            <Text style={tw`font-bold`}>{name}</Text>
            <Text>{address}</Text>
            </View>

            <Pressable onPress={renderProfile}>
            <View style={tw`mt-2`}>
                <Image source={{ uri: profilePicture }} style={tw`h-15 w-15 rounded-full`} />
            </View>
            </Pressable>
            
            <Text style={tw`my-2`}>{missionStatement}</Text>

            <View style={tw`flex-row justify-between items-center mt-2`}>
                <Text style={tw`text-blue-400 font-bold `}>{votes}</Text>

                <Pressable onPress={handleVote}>
                <View style={tw`bg-black text-white p-2 w-[100px] rounded-[50px] items-center`}>
                 <Text style={tw`text-white`}>Vote</Text>
                </View>
                </Pressable>
            </View>
        </View>
        
        </>
    )
}

export default Candidate;