import { StyleSheet , Dimensions } from "react-native"

const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
   maindiv: {
      height: height/1,
      // backgroundColor: 'green',
      padding: 10,
   },
   FirstView:{
      height: height/1,
      // backgroundColor:'red',
      padding: 10,
   },
   PageView:{
      height: height/1,
      // backgroundColor:'yellow',
      padding: 10,
   } ,
   Headingdiv:{
      margin: 5,
      height: height/2.6,
      // backgroundColor:'pink',
   },
   headingcontainer:{
      margin: 5,
      borderBottomColor: 'black',
      // borderWidth: 1,
   },
   headingtext:{
      fontSize: 30,
      fontWeight: '400',
      color: '#FCFCFC'
   },
   subheadingtext:{
      fontSize: 15,
      fontWeight: '400',
      color: '#FCFCFC'
   },
   Contentbox:{
      margin: 5,
      height: height/2.3,
      // backgroundColor:'pink',
   },
   Input:{
      margin: 5,
      height: height/4,
      borderColor:'black',
      // borderWidth: 1,
   },
   inputfeild:{
      margin: 5,
      height: height/8,
      borderColor:'black',
      // borderWidth: 1,
   },
   input:{
      padding: 16,
      backgroundColor: 'white',
      borderWidth: 1,
      // borderColor: 'gray',
   },
   subInput:{
      margin: 5,
      height: height/17,
      // backgroundColor: 'white',
      // borderWidth: 1,
      borderColor: 'gray',
      flexDirection: 'row-reverse',
      alignItems: 'center',
   },
   SubmitButton:{
      margin: 5,
      marginTop: 30,
      height: height/8,
      borderColor:'black',
      borderWidth: 1,
   },
   button: {
      alignItems: "center",
      backgroundColor: "red",
      padding: 18,
    },
    buttondisable:{
      alignItems: "center",
      backgroundColor: "grey",
      padding: 18,
    },
    buttonText:{
      color: 'white',
    },
    haveaccount:{
      paddingTop: 10
    },
    skipbutton:{
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    GenderView:{
      marginTop: 40,
      borderColor:'black',
      // borderWidth: 1,
    },
    options:{
     marginTop: 5,
     padding: 4,
   //   backgroundColor:'green',
    },
    option:{
      marginTop: 5,
      padding: 2,
      // backgroundColor:'green',
      flexDirection:'row',
      alignItems: 'center',
    },
    checkbox:{
      height: 30,
      width: 30,
      borderColor:'black',
      borderWidth: 1,
      backgroundColor: 'white',
    },
    tinyLogo:{
      height: 30,
      width: 30,
    },
    optionname:{
      marginLeft: 10,
    },
    Birthday:{
      paddingTop: 70,
      margin:5,
    },
    agebox:{
      marginTop: 30,
      marginLeft: 5,
      width : width/2.8,
      justifyContent:'space-between',
      alignItems: "center",
      flexDirection:'row',
      // backgroundColor:'white',
      flexDirection: 'row',
    },
    chousenimage:{
      padding:5
    },
    ChousenAvatar :{
      borderRadius: 50,
      height: 100,
      width: 100,
      alignSelf: 'center'
    },
    imageoptions:{
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      // backgroundColor: 'yellow',
      flexDirection: 'row',
    },
    AvatarOptions:{
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    content:{
      color: 'white',
    },
    GenderText:{
      color: 'white',
      fontSize: 20
    },
    datebutton:{
      height: 50,
      backgroundColor: 'lightgray',
      justifyContent: 'center',
    }
})