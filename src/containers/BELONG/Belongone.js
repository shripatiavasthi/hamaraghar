import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { SafeAreaView, View, Text, TextInput, ScrollView, ImageBackground, FlatList, TouchableOpacity, Alert } from 'react-native'
import styles from '../../css/Maincss'
import belongstyles from '../../css/Belong'
import { navigate, Screens } from '../../helpers/Screens';
import { getCategories } from '../../Slices/Belongslice'
import { unwrapResult } from '@reduxjs/toolkit'

const image = { image: require("../../staticdata/images/BackgroundImage.png") }

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];



export const Belongone = (props) => {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const getCat = async () => {
        const data = {
            token: props?.token
        }
        const resp = await dispatch(getCategories(data))
        const rawData = await unwrapResult(resp)
        setData(rawData?.data?.result ?? [])
        // console.log(rawData?.data?.result,"MMMM")
    }
    useEffect(() => {
        getCat()
    }, [])

    const { navigation } = props

    const Item = ({ title, item }) => (
        <TouchableOpacity onPress={() => {
            navigation.push(Screens.SubCategories, { item: item })
        }}>
            <ImageBackground source={image.image} style={belongstyles.categoryimage} >
                <Text style={belongstyles.categorytext}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item title={item.name} item={item} />
    );

    return (
        <SafeAreaView>
            <View style={belongstyles.containerone}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={belongstyles.Headingdiv}>
                            <View style={belongstyles.headingcontainer}>
                                <Text style={belongstyles.headingtext}>Belong</Text>
                            </View>
                            <View style={belongstyles.headingcontainer}>
                                <Text style={belongstyles.detTxt}>Select from existing communities or</Text>
                                <Text style={belongstyles.detTxt}>create your own</Text>
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
                                        data={data}
                                        numColumns={3}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                        <View style={belongstyles.Browsealldiv} >
                            <Text style={belongstyles.subheadingtext}>Browse All</Text>
                            <Text>Architecture</Text>
                            <Text>Arts</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    token: state?.loginSliceNew?.token
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Belongone)