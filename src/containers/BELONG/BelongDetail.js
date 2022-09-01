import React, { useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, View, Text, TextInput, ScrollView, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import styles from '../../css/Maincss'
import belongstyles from '../../css/Belong'

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

export const BelongDetails = (props) => {

    return (
        <SafeAreaView>
            <View style={belongstyles.container}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={belongstyles.Headingdiv}>
                            <View style={belongstyles.headingcontainer}>
                                <Text style={belongstyles.headingtext}>Belong</Text>
                            </View>
                            <View style={belongstyles.headingcontainer}>
                                <Text >Select from existing communities or</Text>
                                <Text >create your own</Text>
                            </View>
                        </View>
                        <View style={belongstyles.DetailContainer}>
                            <ScrollView>
                                <View style={belongstyles.CradHeading}>
                                    <Text>Pregnant women in HSR </Text>
                                    <Text>Layout</Text>
                                </View>
                                <View style={belongstyles.descreption}>
                                    <Text>description</Text>
                                </View>
                                <View style={belongstyles.subpoints}>
                                    <Text>1000+ Members</Text>
                                    <TouchableOpacity>
                                        <Text>Ask to Join</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={belongstyles.subpoints}>
                                    <Text>Private Group</Text>
                                </View>
                                <View style={belongstyles.subpoints}>
                                    <Text>Verified experts in the group</Text>
                                </View>
                                <View style={belongstyles.subpoints}>
                                    <Text>Discussion in the group</Text>
                                </View>
                                <View style={belongstyles.qna}>
                                    <Text>Discussion in the group</Text>
                                </View>
                                <View style={belongstyles.qna}>
                                    <Text>Discussion in the group</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BelongDetails)