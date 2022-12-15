import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { SafeAreaView, View, Text, TextInput, ScrollView, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import styles from '../../css/Maincss'
import belongstyles from '../../css/Belong'
import { getSubCategoriesCommunity } from "../../Slices/Belongslice"
import { navigate, Screens } from '../../helpers/Screens';
import { unwrapResult } from '@reduxjs/toolkit'
import CreateBelong from '../CreateBelong/CreateBelong'

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


export const BelongThree = (props) => {

    const { navigation } = props

    console.log(props?.route?.params?.item, "props in BelongThree")

    const [categoryid  , setcategoryid] = useState(props?.route?.params?.item)

    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const getData = async () => {

        const data = {
            token: props?.token,
            // query: {
            //     category_id : categoryid?.category_id, 
            //     sub_category_id : categoryid?.id
            // },
            query : {
                category_id : props?.route?.params?.item?.category_id,
                sub_category_id : props?.route?.params?.item?.id
            }
        }
        console.log(data , ">>>>>>>>>>>>>")
        const resp = await dispatch(getSubCategoriesCommunity(data))
        const rawData = await unwrapResult(resp)
        setData(rawData?.data?.result ?? [])
    }
    useEffect(() => {
        getData()
    }, [categoryid?.id])

    console.log(data, "data in belong three")

    //   const Item = ({ title, item }) => (
    //     <TouchableOpacity onPress={() => {
    //         navigation.push(Screens.SubCategories, { item: item })
    //     }}>
    //         {/* <ImageBackground source={image.image} style={belongstyles.categoryimage} > */}
    //             <Text style={belongstyles.categorytext}>{title}</Text>
    //         {/* </ImageBackground> */}
    //     </TouchableOpacity>
    // );


    const Item = ({ title, item }) => (
        <View style={belongstyles.card}>
            <Text style={belongstyles.subheadingtext}>hello</Text>
            <View >
                <TouchableOpacity onPress={()=>{
                     navigation.push(Screens.BelongDetails )
                }}>
                <Text style={{ color: 'black' }}>{title}</Text>
                </TouchableOpacity>
            </View>

            {/* {title && title.map((item, index) => {
                console.log(item , "items")
                return (
                    <View key={index}>
                        <Text style={{color:'black'}}></Text>
                    </View>
                )
            })}  */}
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.name} item={item} />
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
                                <Text style={{ color: 'black' }}>Select from existing communities or</Text>
                                <Text style={{ color: 'black' }}>create your own</Text>
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
                                        renderItem={renderItem}
                                        keyExtractor={item => item}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                        <View style={belongstyles.browseAll}>
                            <TouchableOpacity style={belongstyles.SubmitButton} onPress={() => {
                                navigation.push(Screens.CreateBelong , {categoryid})
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
    token: state?.loginSliceNew?.token
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BelongThree)