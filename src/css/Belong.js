import { StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
    containerone: {
        height: height / 1,
        backgroundColor: 'A09A9A',
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
        // fontSize: 30,
        // fontWeight: '400',
        // color: 'black',
        fontSize: 36,
        // fontFamily: Montserrat,
        fontWeight: '400',
        color: 'black'
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
        paddingLeft: 20,
        backgroundColor: 'C4C4C4',
    },
    categories: {
        marginTop: 5,
        height: height / 2.2,
        borderColor: 'black',
        // borderWidth: 1,
    },
    Category: {
        // marginTop: 5,
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
        color: 'lightgreen',
        fontWeight: '900',
        margin: 5,
    },
    browseAll: {
        marginTop: height / 30,
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
    card: {
        height: height / 7,
        marginTop: 5,
        marginBottom: 5,
        // backgroundColor: 'white',
    },
    SubmitButton: {
        backgroundColor: 'red',
        height: height / 17,
        width: height / 2.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SubmitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        // fontFamily: 'Montserrat'
    },
    DetailContainer: {
        height: height / 1.4,
        borderColor: 'black',
        // borderWidth: 1,
    },
    CradHeading: {
        marginTop: 10,
        height: height / 13,
        borderColor: 'black',
        // borderWidth: 1,
        justifyContent: 'space-around'
    },
    descreption: {
        marginTop: 10,
        height: height / 8,
        borderColor: 'black',
        // borderWidth: 1,
    },
    subpoints: {
        marginTop: 10,
        height: height / 15,
        borderColor: 'black',
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    qna: {
        marginTop: 10,
        marginBottom: 10,
        height: height / 8,
        width: height / 2,
        borderColor: 'black',
        // borderWidth: 1,
        backgroundColor: 'white',
    },
    form: {
        height: height / 1.8,
        borderColor: 'black',
        // borderWidth: 1,
    },
    InviteView: {
        height: height / 1.7,
        borderColor: 'black',
        // borderWidth: 1,
    },
    sectionone: {
        marginTop: 10,
        height: height / 11,
        borderColor: 'black',
        // borderWidth: 1,
    },
    sectiontwo: {
        marginTop: 10,
        height: height / 5,
        borderColor: 'black',
        // borderWidth: 1,
    },
    sectionthree: {
        marginTop: 10,
        height: height / 14,
        borderColor: 'black',
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    describeinput: {
        marginTop: 10,
        height: height / 6,
        backgroundColor: 'white',
    },
    OPTIONS: {
        height: height / 22,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ChouseSection: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    UnSelectChouseSection: {
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    followers: {
        marginTop: 10,
        paddingBottom: 10,
    },
    options: {
        marginTop: 5,
        margingBottom: 5,
        borderBottomColor: 'C4C4C4',
        borderBottomWidth: 1,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height / 12,
    },
    detTxt: {
        color: 'black',
        fontSize: 12,
    },
    Browsealldiv: {
        marginTop: 10,
        // backgroundColor: 'yellow',
    },
    forminput: {
        backgroundColor: 'white',
    },
    descibeforminput: {
        backgroundColor: 'white',
        minHeight: height / 6,
    },
    Subheading: {
        fontSize: 22,
        color: 'black',
        fontWeight: '600',
    },
    nameview: {
        height: height / 8,
        justifyContent: 'space-around',
        borderColor: 'black',
        // borderWidth: 1,
    },
    DescribeView: {
        marginTop: 10,
        height: height / 4.7,
        justifyContent: 'space-around',
        borderColor: 'black',
        // borderWidth: 1,
    },
    Suggestiontag: {
        marginTop: 5,
        borderColor: 'black',
        // borderWidth: 1,
        flexDirection: 'row',
        height: height / 18,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 18
    },
    optionname: {
        flexDirection: 'row',
        borderColor: 'black',
        // borderWidth: 1,
        alignItems: 'center',
        width: width / 1.6,
        height: height / 18
    },
    user:{
        margin : 5
    },
    selectoptiontext : {
        color: 'black',
        fontSize: 18,
        fontWeight :'600'
    },
    unselectoptiontext : {
        fontSize: 18,
        fontWeight :'600'
    },
    GenderText:{
        color: 'black',
        fontSize: 12,
        fontWeight :'600'
    },
    ImageContainer:{
        height: height /2,
        width : width / 1.1,
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageView:{
        backgroundColor: 'green',
        borderRadius: 50,
    }
})



