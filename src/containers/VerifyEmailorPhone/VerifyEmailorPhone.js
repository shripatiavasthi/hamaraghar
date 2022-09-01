import React , {useState} from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity , ImageBackground } from 'react-native'
import styles from '../../css/Maincss'
import { navigate, Screens } from '../../helpers/Screens';

const { height, width } = Dimensions.get('screen')

export const VerifyEmailorPhone = ({navigation , props } ) => {

    const image = { image: require("../../staticdata/images/BackgroundImage.png") }

    const [emailotp , setemailotp] = useState()
    const [smsotp , setsmsotp] = useState()

  return (
    <SafeAreaView >
            <ImageBackground source={image.image} style={styles.maindiv}>
                <View style={styles.FirstView}>
                    <View style={styles.PageView}>
                        <View style={styles.Headingdiv}>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.headingtext}>Verify your e-mail or phone</Text>
                            </View>
                            <View style={styles.headingcontainer}>
                                <Text style={styles.subheadingtext}> We have sent you an OTP please check your email / phone and verify</Text>
                            </View>
                        </View>
                        <View style={styles.Contentbox}>
                            <View style={styles.Input}>
                                <View style={styles.inputfeild}>
                                    <TextInput placeholder='enter email OTP' style={styles.input}
                                        onChangeText={(value) => {
                                            setemailotp(value)
                                        }}
                                    >
                                    </TextInput>
                                    <TextInput placeholder='enter phone OTP' style={styles.input}
                                        onChangeText={(value) => {
                                            setsmsotp(value)
                                        }}
                                    >
                                    </TextInput>
                                </View>
                                <View style={styles.subInput}>

                                </View>
                            </View>
                            <View style={styles.SubmitButton}>
                                <TouchableOpacity
                                    disabled={emailotp && smsotp ? false : true}
                                    style={emailotp && smsotp ? styles.button : styles.buttondisable}
                                    onPress={() => {
                                        
                                    }}
                                >
                                    <Text style={styles.buttonText}>Verify</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.skipbutton}
                                    onPress={() => {
                                        navigation.navigate(Screens.Sucess)
                                    }}
                                >
                                    <Text style={styles.content}>Skip</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
  )
}


const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailorPhone)