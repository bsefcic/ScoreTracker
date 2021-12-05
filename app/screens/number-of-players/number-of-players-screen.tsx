import React, { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, GradientBackground } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
  paddingBottom: spacing[7],
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const MENU_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const MENU_BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
  marginBottom: spacing[4],
}

export const NumberOfPlayersScreen: FC<StackScreenProps<NavigatorParamList, "numberOfPlayers">> = observer(
  ({ navigation }) => {
    const { gameStore, ongoingGameStore } = useStores()
    const { games } = gameStore
    let minNumberOfPlayers = 0;
    let maxNumberOfPlayers = 0;
    games.forEach(game => {
      console.log(game.name)
      if (game.name == ongoingGameStore.name)
       { minNumberOfPlayers = game.minNumberOfPlayers;
          maxNumberOfPlayers = game.maxNumberOfPlayers;  
      }
    })
    // Nu am reusit sa afisez butoanele, am incercat cu functie si direct.
    const myButtons = () => {Array.from(
      { length: maxNumberOfPlayers - minNumberOfPlayers + 1 },
      (_, i) => Number(i) + Number(minNumberOfPlayers)).map((index) => (
        <Button
              style={MENU_BUTTON}
              textStyle={MENU_TEXT}
              text="Dragos"
              onPress={() => {
                navigation.navigate("menu")
              }}
            />
      ))
    }
    return (
      <View testID="NumberOfPlayersScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
          <Text style={TITLE_WRAPPER}>
            <Text style={TITLE} text="Choose the number of players!"/>
          </Text>
          {/*nici asa nu apar*/}
          {[3,4,5,6,7,8].map((i,index) =>{
            console.log(i);
            console.log(index);
            <Button
            key={index}
            style={MENU_BUTTON}
            textStyle={MENU_TEXT}
            text='${value}'
            
          />
          })}
            
        
        </Screen>
      </View>
    )
  },
)
