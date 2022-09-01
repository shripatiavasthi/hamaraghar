import React, { useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, View, Text, TextInput, ScrollView, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import styles from '../../css/Maincss'
import belongstyles from '../../css/Belong'
import { navigate, Screens } from '../../helpers/Screens';

export const CreateBelong = ({ props, navigation }) => {



    return (
        <SafeAreaView>
            <View style={belongstyles.container}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={belongstyles.Headingdiv}>
                            <View style={belongstyles.headingcontainer}>
                                <Text style={belongstyles.headingtext}>Create</Text>
                            </View>
                            <View style={belongstyles.headingcontainer}>
                                <Text >Not happy with what’s out there, </Text>
                                <Text >create your own community!</Text>
                            </View>
                        </View>
                        <View style={belongstyles.form}>
                            <View style={belongstyles.sectionone}>
                                <Text>Name your community</Text>
                                <TextInput style={belongstyles.input} />
                            </View>
                            <View style={belongstyles.sectiontwo}>
                                <Text>Describe it</Text>
                                <TextInput style={belongstyles.describeinput} />
                            </View>
                            <View style={belongstyles.sectionthree}>
                                <Text>Suggested tags</Text>
                                <Text>Sports</Text>
                                <Text>Football</Text>
                            </View>
                            <View style={belongstyles.sectionthree}>
                                <Text>Anyone can join</Text>

                            </View>
                            <View style={belongstyles.sectionthree}>
                                <Text>Anyone can post</Text>
                                
                            </View>
                        </View>
                        <View style={belongstyles.browseAll}>
                            <TouchableOpacity style={belongstyles.SubmitButton} onPress={() => {
                                navigation.navigate(Screens.InvitePeople)
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBelong)