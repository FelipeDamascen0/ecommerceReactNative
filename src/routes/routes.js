import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Home from '../pages/home/index';
import Cart from "../pages/cart/cart";
import CartProvider from "../pages/context/context";
import { View, Text, } from 'react-native';
import { useCart } from "../pages/context/context"; 
const Tab = createBottomTabNavigator();

const Route = () => {
    return(
        <CartProvider>
            <NavigationContainer>
                <Tab.Navigator  screenOptions={({ route} ) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;

                            switch (route.name) {
                                case 'Home':
                                    iconName = 'home';
                                    break;
                                case 'Cart':
                                    iconName = 'shopping-cart';
                                    break;
                            }

                            return <MaterialIcons name={iconName} size={size} color={color} />;
                        },
                        headerShown: false
                    })}
                    >
                    <Tab.Screen name="Home" component={ Home } />
                    <Tab.Screen name="Cart" component={ Cart } options={{tabBarIcon: IconWithBadge}}/>
                </Tab.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
}


function IconWithBadge(){

    const { cart } = useCart();
    return(
        <View style={{width: 20, height: 20, alignItems: 'center', justifyContent: 'center', backgroundColor:'#000', borderRadius: 50}}>
            <Text style={{color: '#fff'}}>{
                Object.keys(cart).length
            }</Text>
        </View>
    )
}

export default Route;
