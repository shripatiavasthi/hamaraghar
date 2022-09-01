import { StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
    containerone: {
        height: height / 1,
        backgroundColor: 'rgba(151, 151, 151)',
        padding: 10,
    },
    containertwo: {
        height: height / 1,
        backgroundColor: 'rgba(235,230,230)',
        padding: 10,
    },
    Headingdiv: {
        height: height / 8,
        // backgroundColor: 'pink',
    },
    headingcontainer: {
        margin: 5,
        borderBottomColor: 'black',
        // borderWidth: 1,
    },
    headingtext: {
        fontSize: 30,
        fontWeight: '400',
        color: 'black',
    },
    Searchsection: {
        marginTop: 5,
        height: height / 10,
        // backgroundColor: 'green',
        justifyContent: 'center',
    },
    Searchbox: {
        height: height / 17,
        backgroundColor: 'white'
    },
    SearchInput: {
        backgroundColor: 'C4C4C4',
    },
    categories: {
        marginTop: 5,
        height: height / 2.2,
        borderColor: 'black',
        // borderWidth: 1,
    },
    Category: {
        marginTop: 10,
        height: height / 2.3,
        borderColor: 'black',
        // borderWidth: 1,
    },
    categoryimage: {
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        height: height / 8,
        width: height / 8,
        flexDirection: 'column-reverse',
        alignItems: 'center',
    },
    categorytext: {
        color: 'white',
        margin: 5,
    },
    browseAll: {
        marginTop: 10,
        height: height / 10,
        borderColor: 'black',
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subheadingtext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    card:{
        height: height / 5,
        marginTop: 5,
        marginBottom: 5,
        // backgroundColor: 'white',
    },
    SubmitButton:{
        backgroundColor: 'red',
        height: height / 17,
        width: height/2.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SubmitButtonText:{
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Montserrat'
    },
    DetailContainer:{
        height: height /1.4,
        borderColor: 'black',
        // borderWidth: 1,
    },
    CradHeading:{
        marginTop: 10,
        height: height/13,
        borderColor: 'black',
        // borderWidth: 1,
        justifyContent: 'space-around'
    },
    descreption:{
        marginTop: 10,
        height: height/8,
        borderColor: 'black',
        // borderWidth: 1,
    },
    subpoints:{
        marginTop: 10,
        height: height/15,
        borderColor: 'black',
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    qna:{
        marginTop: 10,
        marginBottom: 10,
        height: height/8,
        width: height/2,
        borderColor: 'black',
        // borderWidth: 1,
        backgroundColor: 'white',
    },
    form:{
        height: height/1.7,
        borderColor: 'black',
        // borderWidth: 1,
    },
    sectionone:{
        marginTop: 10,
        height: height/11,
        borderColor: 'black',
        // borderWidth: 1,
    },
    sectiontwo:{
        marginTop: 10,
        height: height/5,
        borderColor: 'black',
        // borderWidth: 1,
    },
    sectionthree:{
        marginTop: 10,
        height: height/14,
        borderColor: 'black',
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input:{
        marginTop: 10,
        backgroundColor: 'white',
    },
    describeinput:{
        marginTop: 10,
        height: height/6,
        backgroundColor: 'white',
    },
    OPTIONS:{
        height: height/20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    ChouseSection:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        height :40,
        width :100,
        justifyContent:'center',
        alignItems: 'center',
    },
    UnSelectChouseSection:{
        height :40,
        width :100,
        justifyContent:'center',
        alignItems: 'center',
    },
    followers:{
        marginTop: 10,
        paddingBottom: 10,
    },
    options:{
        marginTop: 5,
        margingBottom: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    option:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height/ 17,
    }
})



