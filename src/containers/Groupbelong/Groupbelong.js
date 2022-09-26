import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Dimensions, FlatList, SafeAreaView, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const { height, width } = Dimensions.get('screen')

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'whatshisname',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'whatshisname',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'whatshisname',
    },
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <View style={styles.replysection}>
            <View style={styles.options}>
                <EvilIcons name="user" size={35} color="black" />
                <TouchableOpacity><Text style={styles.optiontxt}>lopamudra</Text></TouchableOpacity>
            </View>
            <View style={styles.more}>
                <Text style={styles.optiontxt}>toysrus and 2 more</Text>
            </View>
        </View>
    </View>
);

export const ConversationGroups = (props) => {

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Header}>
                <View style={styles.profileimage}>
                    <AntDesign name="left" size={35} color="black" />
                </View>
                <View style={styles.profileimage}>
                    <Text style={styles.headertext}>Conversation</Text>
                    <Text style={styles.subheadertext}>You, lopamudra, 50 others</Text>
                </View>
                <View style={styles.brandlogo}>
                    <EvilIcons name="search" size={35} color="black" />
                </View>
            </View>
            <View style={styles.noofpeopleacive}>
                <Text style={styles.peopleactive}>52 people in conversation</Text>
            </View>
            <View style={styles.conversationbox}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    Header: {
        height: height / 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    profileimage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headertext: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600'
    },
    subheadertext: {
        fontSize: 10,
        color: 'black',
        fontWeight: '400'
    },
    conversationbox: {
        flex: 1,
        marginTop: 2,
        backgroundColor: 'white'
    },
    item: {
        height: height / 12,
        // backgroundColor: 'pink',
        // marginBottom: 5,
        // padding: 3,
    },
    replysection: {
        height: height / 14,
        padding :10,
        // backgroundColor : 'lightblue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColorColor : 'lightgray',
        borderBottomWidth: 0.5,
    },
    options: {
        width: width / 3,
        flexDirection: 'row',
        borderColor: 'black',
        // borderWidth : 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    more: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        // borderWidth : 1,
    },
    optiontxt: {
        fontSize: 14,
        fontWeight : '700',
        color  :'black'
    },
    noofpeopleacive:{
        height: height / 17,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 2,
        backgroundColor : 'white'
    },
    peopleactive:{
        fontSize: 14,
        // fontWeight : '900',
        color  :'black'
    }
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationGroups)