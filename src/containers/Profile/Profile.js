import React from 'react'
import { connect } from 'react-redux'
import { View , Text } from 'react-native'

export const Profile = (props) => {
  return (
    <View>
        <Text>Profile</Text>
    </View>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)