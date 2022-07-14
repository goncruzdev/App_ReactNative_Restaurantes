import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RestaurantesScreen } from "../screens/Restaurants/RestaurantesScreen";
import { screen } from "../utils";
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen";

const Stack = createNativeStackNavigator();

export function RestaurantStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restaurant.restaurats}
        component={RestaurantesScreen}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
        name={screen.restaurant.addRestaurant}
        component={AddRestaurantScreen}
        options={{ title: "Nuevo Restaurante" }}
      />
    </Stack.Navigator>
  );
}
