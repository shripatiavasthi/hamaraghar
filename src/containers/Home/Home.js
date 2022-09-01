import React from 'react'
import { connect } from 'react-redux'
import { View , Text } from 'react-native'

export const Home = (props) => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)