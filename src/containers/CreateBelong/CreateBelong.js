import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { SafeAreaView, View, Text, TextInput, ScrollView, ImageBackground, FlatList, TouchableOpacity, Alert, Switch, Button } from 'react-native'
import styles from '../../css/Maincss'
import belongstyles from '../../css/Belong'
import { navigate, Screens } from '../../helpers/Screens';
import { generate_group }from '../../Slices/GenerateGroupSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const CreateBelong = (props) => {

    const { navigation } = props
    const dispatch = useDispatch()
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [isEnabledtwo, setIsEnabledtwo] = useState(false);
    const toggleSwitchtwo = () => setIsEnabledtwo(previousState => !previousState);

    const [aliesname , setaliesname] = useState();
    const [communityname , setcommunityname] = useState();
    const [description , setdescription] = useState();


    return (
        <SafeAreaView>
            <View style={belongstyles.containerone}>
                <View >
                    <View style={styles.PageView}>
                        <View style={belongstyles.Headingdiv}>
                            <View style={belongstyles.headingcontainer}>
                                <Text style={belongstyles.headingtext}>Create</Text>
                            </View>
                            <View style={belongstyles.headingcontainer}>
                                <Text style={belongstyles.detTxt}>Not happy with what’s out there, create</Text>
                                <Text style={belongstyles.detTxt}>your own community!</Text>
                            </View>
                        </View>
                        <View style={belongstyles.form}>
                            <View style={belongstyles.nameview}>
                                <Text style={belongstyles.Subheading}>Name </Text>
                                <TextInput placeholder="" style={belongstyles.forminput} onChangeText={txt => {
                                        setaliesname(txt)
                                    }}></TextInput>
                            </View>
                            <View style={belongstyles.nameview}>
                                <Text style={belongstyles.Subheading}>Name your community</Text>
                                <TextInput placeholder="" style={belongstyles.forminput} onChangeText={txt => {
                                        setcommunityname(txt)
                                    }}></TextInput>
                            </View>
                            <View style={belongstyles.DescribeView}>
                                <Text style={belongstyles.Subheading}>Describe it</Text>
                                <TextInput placeholder="" multiline={true} style={belongstyles.descibeforminput} onChangeText={txt => {
                                        setdescription(txt)
                                    }}></TextInput>
                            </View>
                            <View style={belongstyles.Suggestiontag}>
                                <Text style={belongstyles.Subheading}>Suggested tags</Text>
                                <Text style={belongstyles.detTxt}>Sports</Text>
                                <Text style={belongstyles.detTxt}>Football</Text>
                            </View>
                            <View style={belongstyles.Suggestiontag}>
                                <Text style={belongstyles.Subheading}>Anyone can join</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                            {/* <View style={belongstyles.Suggestiontag}>
                                <Text style={belongstyles.Subheading}>Anyone can post</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabledtwo ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitchtwo}
                                    value={isEnabledtwo}
                                />
                            </View> */}
                        </View>
                        <View style={belongstyles.browseAll}>
                            <TouchableOpacity style={belongstyles.SubmitButton} onPress={ async () => {
                                const data = {
                                    query: {},
                                    body: {
                                        "category_id": 1,
                                        "group_alias": aliesname,
                                        "group_name": communityname,
                                        "is_active": true,
                                        "group_access_type": 'public',
                                        "group_profile_picture": "",
                                    },
                                    token : props?.token
                                }
                                const resp = await dispatch(generate_group(data))
                                const rawData = await unwrapResult(resp)
                                console.log(rawData?.data, "create group data")
                                navigation.push(Screens.InvitePeople )
                            }}>
                                <Text style={belongstyles.SubmitButtonText}>Create your own community </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    token : state?.loginSliceNew?.token
})

const mapDispatchToProps = (dispatch) => {
    return {
        create_group: (data) => {
            return dispatch(generate_group(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBelong)