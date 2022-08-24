import React , {useState} from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity , Alert } from 'react-native'
import { send_otp_phone } from '../../Slices/SendPhoneOtpSlice'
import { send_otp_email } from '../../Slices/SendEmailOtpSlice'

const { height, width } = Dimensions.get('screen')

export const AddEmailorPhone = (props) => {

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    console.log(props.phoenotp , "phone otp" , props.emailotp , "email otp")

    const OTPphone = () => {
        const data = {
            query: {},
            body: {
                phone_number: phone,
                country_code: 5
            }
        }
        props?.sendOtpPhone(data)
    }

    const OTPemail = () => {
        const data = {
            query: {},
            body: {
                email: email
            }
        }
        props?.sendOtpEmail(data)
    }

    return (
        <SafeAreaView >
            <View style={styles.signup}>
                <View style={styles.mainview}>
                    <View style={styles.subview}>
                        <Text style={styles.heading}>Add your e-mail or phone</Text>
                        <Text style={styles.subheading}>vcvfhjvxbv vhdfvhbdfxmnfvhv gfgdsvchdf gvchgdvcghd gvcghdvcghd vcgvfdcv vhcvdhc hgvhgdvch vchdvchgdfvch hvchgdfvhgdfv vhvdfhvd vhgvdfhgvdfhgv b hbvhdfbvhjdfbvjdf v jf vhfdvh nmbv  vdvhdf vb dh v d v</Text>
                    </View>
                    <View style={styles.subview}>
                        <View>
                            <TextInput placeholder='enter email' style={styles.input} 
                            onChangeText={(value)=>{
                                setEmail(value)
                            }}
                            >
                            </TextInput>
                            <TextInput placeholder='enter phonenumber' style={styles.input}
                            onChangeText={(value)=>{
                                setPhone(value)
                            }}
                            >
                            </TextInput>
                        </View>
                        <TouchableOpacity style={styles.submit}
                            onPress={() => {
                                if(phone && email){
                                    OTPphone()
                                    OTPemail()
                                }else if (email){
                                    OTPemail()
                                }else if (phone){
                                    OTPphone()
                                } 
                            }}
                        >
                            <Text>Send OTP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.haveaccount}>
                            <Text>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    signup: {
        height: height / 1,
        padding: 10,
        // backgroundColor: 'green'
    },
    mainview: {
        // backgroundColor: 'pink',
        height: height / 1,
        padding: 10
    },
    subview: {
        height: height / 2.6,
        margin: 10,
        // backgroundColor: 'red',
        padding: 10
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subheading: {
        paddingTop: 10,
        fontSize: 15
    },
    input: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
    },
    forget: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingTop: 10
    },
    submit: {
        backgroundColor: 'yellow',
        height: height / 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    haveaccount: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = (state) => ({
    phoenotp : state.send_otp_phone,
    emailotp : state.send_otp_email
})

const mapDispatchToProps = (dispatch) => {
    return {
        sendOtpPhone: (data) => {
            dispatch(send_otp_phone(data));
        },
        sendOtpEmail: (data) => {
            dispatch(send_otp_email(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmailorPhone)