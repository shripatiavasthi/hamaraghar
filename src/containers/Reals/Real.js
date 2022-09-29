import React from 'react'
import { connect } from 'react-redux'
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];


const { height, width } = Dimensions.get('screen')

const image = { uri: "https://reactjs.org/logo-og.png" };

const Item = ({ title }) => (
    <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.first}>
            <View style={styles.firstcolumn}>
            </View>
            <View style={styles.secondcolumn}>
                <View>
                    <FontAwesome name="comment-o" size={25} color="white" />
                    <Text style={styles.text}>100k</Text>
                </View>
                <View>
                    <Fontisto name="bookmark" size={25} color="white" />
                    <Text>1k</Text>
                </View>
                <View>
                    <Feather name="send" size={25} color="white" />
                    <Text>1k</Text>
                </View>
            </View>
        </View>
        <View style={styles.second}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <EvilIcons name="user" size={25} color="black" />
                <View>
                    <Text style={{ color: "black", fontSize: 12, fontWeight: '600' }}>lopamudra</Text>
                    <Text style={{ color: "black", fontSize: 10, fontWeight: '400' }}>/junglecats</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
    </View>
);

export const Real = (props) => {

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    first: {
        // backgroundColor: 'yellow',
        flex: 1,
        flexDirection: 'row',
    },
    second: {
        // backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: height / 14,
        alignItems: 'center',
    },
    firstcolumn: {
        flex: 0.9,
        // backgroundColor: 'white',
    },
    secondcolumn: {
        justifyContent: 'flex-end',
    },
    text: {
        color: "white",
        fontSize: 12,
    }

})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Real)