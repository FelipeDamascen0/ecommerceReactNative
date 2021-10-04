import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar, Button  } from 'react-native';
import product from '../../../assets/products.json';
import { MaterialIcons } from '@expo/vector-icons'
import { FlatList } from 'react-native-gesture-handler';
import { useCart } from '../context/context';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function App() {
    const [shouldShow, setShouldShow] = useState(true);
    let numColumns = 2//numero de colunas que o flat list vai renderizar 
    const { add } = useCart();
    const [list, setList] = useState(product);
    
    const alphabeticalOrder = () => {//faz a ordenação alfabetica
        let newList = [...product];
        newList.sort((a, b) => ( a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        setList(newList);
    };

    const morePopular = () => {//ordena os itens com maior score
        let newList = [...product];
        newList.sort((a, b) => ( a.score < b.score ? 1 : b.score < a.score ? -1 : 0));
        
        setList(newList)
    }

    const biggestPrice = () => {//ordena do maior ao menor preço
        let newList = [...product];
        newList.sort((a, b) => ( a.price < b.price ? 1 : b.price < a.price ? -1 : 0));
        
        setList(newList)
    }

    const lowestPrice = () => {//ordena do menor ao maior preço
        let newList = [...product];
        newList.sort((a, b) => ( a.price > b.price ? 1 : b.price > a.price ? -1 : 0));
        
        setList(newList)
    }


    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <StatusBar backgroundColor="#EA3838" barStyle="light-content" />
                <View style={styles.status}>
                    <View>
                        <Text style={styles.itemStatus}>SUPERA</Text>
                    </View>
                    
                    <TouchableOpacity onPress={alphabeticalOrder}>
                        <MaterialCommunityIcons name="order-alphabetical-ascending" size={24} color="black" />
                    </TouchableOpacity>
                </View>     

                <View style={styles.filter}>
                    <Text style={{marginRight: 150}}>
                        +{product.length} Resultados
                    </Text>

                    <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
                        <Text style={{fontSize:18, justifyContent: 'center', alignSelf: 'center'}}>
                            Filtrar
                            (<MaterialIcons name="arrow-drop-down" size={15} color="black" />)
                        </Text>
                    </TouchableOpacity>  
                </View>

                <View>
                    {/*caso o estao seja true nao ira aparacer nada
                    e se for false vai aparecer a view para selecionar o filtro*/}
                    {shouldShow ? (
                        <View style={styles.hide}>   
                        </View>
                    ) : 
                        <View style={styles.show}>
                            <TouchableOpacity onPress={morePopular}>
                                <Text style={styles.textShow}>Mais Popular</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={biggestPrice}>
                                <Text style={styles.textShow}>Maior Preço</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={lowestPrice}>
                                <Text style={styles.textShow}>Menor Preço</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

                <View style={styles.itensFlat}>
                    <FlatList
                        numColumns={numColumns}
                        data={list}
                        renderItem={({item, key}) =>{
                            return(
                                <View style={styles.itens} key={key}>
                                    <View style={styles.itemStore}>
                                        <Image 
                                            style={styles.imageItemStore}
                                            source={{uri: item.image}}
                                        />
                    
                                        <View style={styles.description , {borderTopColor: "#000", borderTopWidth: 1,marginTop: 15}}>
                    
                                            <Text style={styles.description}>
                                                {item.name}
                                            </Text>
                                            <Text style={{fontSize: 15, padding: 5}}>Frete R${item.frete} </Text>
                    
                                            <View style={styles.addToCart}>
                                                <Text style={styles.price}> R${item.price} </Text>
                                            
                                                <TouchableOpacity key={key} onPress={() => add(item) }>
                                                    <MaterialIcons name="add-shopping-cart" size={30} color="black" />
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
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    show: {
        width: 150, 
        height: 150,
        borderRadius: 10,
        backgroundColor: "#ffff", 
        marginTop: -8, 
        marginLeft: 200,
        display: 'flex',
        position: 'absolute',
        zIndex: 99,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textShow: {
        fontSize: 18,
        paddingBottom: 15
    },

    hide: {
        display: 'none',
        position: 'relative',
    },
    container: {
        backgroundColor: "#E8E8E8"
    },

    filter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        paddingBottom: 15,
        paddingTop: 15
    },

    pickerComponent: {
        width: 35
    },

    textFilter: {
        fontSize: 18,
        paddingLeft: 15,
        paddingRight: 5,
    },

    status: {
        paddingBottom: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#6B6B6B",
        backgroundColor: "#EA3838"
    },

    itemStatus: {
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 150,
        color: "#fff",
        
    },

    imageItemStore: {
        width: '75%',
        height: 180,
        marginTop: 0,
        backgroundColor: '#D1D1D1',
    },

    itemStore: {
        backgroundColor: '#D1D1D1',
        width: 170,
        height:350,
        borderRadius: 15,
        justifyContent:'center',
        alignItems: 'center',
    },

    itensFlat: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
    },

    itens:{
        marginTop: 10,
        marginLeft: 5,
        marginRight:7,
    },

    description: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        color: '#000',
        padding: 5,
    },

    addToCart: {
        flexDirection: 'row'
    },

    price: {
        fontSize: 20,
        fontWeight: 'bold',
        width:'80%',
        color: "#544F4F",
    },

    buttonaddToCart:{
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        fontSize:25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#000',
        width:35,
        height: 35,
        borderRadius: 500,
    },

});
