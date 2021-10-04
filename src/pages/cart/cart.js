import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useCart } from "../context/context";
import { MaterialIcons } from '@expo/vector-icons'

const Cart = () => {
    const { remove, cart, totalValue } = useCart();
    return(
        <View style={{marginTop: 10, flex: 1}}>
            <View style={{borderBottomColor: '#000', borderBottomWidth: 1,}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', padding: 5}}> Carrinho({ Object.keys(cart).length }) </Text>
            </View>
            <FlatList
            data={cart}
            renderItem={ ({ index,item}) => {
                return(
                    <View >
                        <View style={style.products}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    style={style.images}
                                    source={{uri: item.image}}
                                />
                            </View>

                            <View>
                                <Text style={style.name}> {item.name} </Text>
                                <Text style={style.freteText}>Frete R${ item.frete } </Text>
                                <View style={{flexDirection: 'row', }}>
                                    <Text style={style.price}>R${item.price} </Text>
                                    <TouchableOpacity onPress={() => remove(index)}>
                                        <MaterialIcons name="remove-circle" size={30}  style={{marginTop:0, marginLeft: 130}}/>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                    );
                }}
                keyExtractor={(item) => item.id}
            >
            </FlatList>
            <View>
                    {Object.keys(cart).length >= 1 ? (
                        <Text style={style.frete}>Total com o frete: R${totalValue}</Text>
                    ) : 
                        <View style={style.notItemCart}>
                            <MaterialIcons name="shopping-cart" size={200} color="#999999"/>
                            <Text style={{fontSize: 20, color: "#999999"}}>
                                Nenhum item encontrado no carrinho
                            </Text>     
                        </View>
                    }
            </View>
        </View>
                
    )
}

export default Cart;

const style = StyleSheet.create({
    notItemCart: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 350
    },

    products: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#BEBABA'
    },

    name: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
    },

    price: {
        fontSize: 18,
        paddingLeft: 8,
        marginTop: 5,
        fontWeight: 'bold',
    },

    images: {
        width: 50, 
        height: 60,
        marginLeft: 25,
        marginBottom: 20,
        marginTop: 20
    },

    frete: {
        paddingLeft: 15,
        fontSize: 22,
        borderBottomWidth: 1,
        borderBottomColor: "#BEBABA",
        color: '#000',
        marginTop: 15,
        paddingBottom: 15,
        paddingTop: 22,
        paddingTop: 0,
        fontWeight: 'bold',
        borderTopWidth: 1,
        borderTopColor: '#BEBABA',
    },

    freteText:{
        padding:5
    }
})