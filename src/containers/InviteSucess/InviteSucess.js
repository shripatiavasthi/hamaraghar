import React, { useState, } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, View, Text, TextInput, ScrollView, ImageBackground, FlatList, TouchableOpacity, Image } from 'react-native'
import styles from '../../css/Maincss'
import belongstyles from '../../css/Belong'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { navigate, Screens } from '../../helpers/Screens';

export const InviteSucess = (props) => {

    const { navigation } = props

    return (
        <SafeAreaView>
            <View style={belongstyles.container}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={belongstyles.Headingdiv}>
                            <View style={belongstyles.headingcontainer}>
                                 <Text style={belongstyles.headingtext}>Invite people</Text>
                            </View>
                            <View style={belongstyles.headingcontainer}>
                                <Text style={belongstyles.detTxt}>Grow your community , invite people to join </Text>
                            </View>
                        </View>
                        <View style={belongstyles.InviteView}>
                            <View style={belongstyles.ImageContainer}>
                                <View style={belongstyles.ImageView}>
                                    <IconAntDesign name="check" size={70}  color="white" style={{padding: 10 , fontWeight: 'bold'}} />
                                </View>
                            </View>
                        </View>
                        <View style={belongstyles.browseAll}>
                            <TouchableOpacity style={belongstyles.SubmitButton} onPress={()=>{
                                 navigation.push(Screens.Tabs)
                            }}>
                                <Text style={belongstyles.SubmitButtonText}>Done </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(InviteSucess)