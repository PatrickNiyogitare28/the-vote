import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import tw from 'twrnc';
import * as SecureStore from 'expo-secure-store'

const CandidateProfile = () => {
   const [data, setData] = useState();
   useEffect(() => {
    getProfileData();
   },[])

   const getProfileData = async () => {
    const profile = JSON.parse(await SecureStore.getItemAsync('candidateProfile'))
    setData(profile);
   }
    return (
        <View style={tw`p-4 h-full bg-white rounded-[10px]`}>

            <View style={tw`justify-around w-full flex-row mt-4`}>
                <Image source={{ uri: data?.profilePicture }} style={tw`h-40 w-40 rounded-full`} />
            </View>
            <View>
                <Text style={tw`text-center mt-4 text-xl font-bold`}>{data?.user?.name}</Text>
                <Text style={tw`text-center`}>({data?.gender})</Text>
                <Text style={tw`text-center my-2`}>{data?.user?.email} | {data?.user?.phone}</Text>
                <Text style={tw`text-center`}>{data?.user?.nationalId}</Text>
                <Text style={tw`text-center mt-4 font-bold italic`}>{data?.missionStatement}</Text>
            </View>

        </View>
    )
}

export default CandidateProfile;