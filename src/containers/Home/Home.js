import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

export const Home = (props) => {
  return (
    <View></View>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)