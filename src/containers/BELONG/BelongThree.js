import React, { useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, View, Text, TextInput, ScrollView, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import styles from '../../css/Maincss'
import belongstyles from '../../css/Belong'
import { navigate, Screens } from '../../helpers/Screens';

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const DATA = [
    {
        title: 'Popular ear you',
        details: [" Pregnant women in indiranagr ", " Pregnant women in HSR Layout ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr "]
    },
    {
        title: 'Second Item',
        details: [" Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr "]
    },
    {
        title: 'Third Item',
        details: [" Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr "]
    },
    {
        title: 'Second Item',
        details: [" Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr "]
    },
    {
        title: 'Third Item',
        details: [" Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr "]
    },
    {
        title: 'Second Item',
        details: [" Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr "]
    },
    {
        title: 'Third Item',
        details: [" Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr ", " Pregnant women in indiranagr "]
    },
];


export const BelongThree = ({ props, navigation }) => {


    const Item = ({ title }) => (

        <View style={belongstyles.card}>
            <Text style={belongstyles.subheadingtext}>{title.title}</Text>
            {title.details && title.details.map((item, index) => {
                return (
                    <View key={index}>
                        <Text style={{color:'black'}}>{item}</Text>
                    </View>
                )
            })}
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item} />
    );

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
                                <Text style={{color:'black'}}>Select from existing communities or</Text>
                                <Text style={{color:'black'}}>create your own</Text>
                            </View>
                        </View>
                        <View style={belongstyles.Searchsection}>
                            <View style={belongstyles.Searchbox}>
                                <TextInput placeholder='Search for communities' style={belongstyles.SearchInput} />
                            </View>
                        </View>
                        <View style={belongstyles.categories}>
                            <ScrollView>
                                <View style={belongstyles.Category}>
                                    <FlatList
                                        data={DATA}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                        <View style={belongstyles.browseAll}>
                            <TouchableOpacity style={belongstyles.SubmitButton} onPress={() => {
                                navigation.navigate(Screens.CreateBelong)
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

export default connect(mapStateToProps, mapDispatchToProps)(BelongThree)