import React, { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, GradientBackground, TextField } from "../../components"
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

const INPUT_STYLE: TextStyle = {
  color: "white",
  backgroundColor: color.palette.deepPurple,
}

export const NameOfPlayersScreen: FC<
  StackScreenProps<NavigatorParamList, "nameOfPlayers">
> = observer(({ navigation }) => {
  const { ongoingGameStore, playerStore } = useStores()
  const { players } = playerStore

  const goBack = () => navigation.goBack()

  const handleInput = (event) => {
    if (event.target.value !== "") {
      const id = Number(playerStore.getNextIndex())
      playerStore.addPlayer({
        id: id,
        name: event.target.value,
        score: 0,
      })
    }
  }

  const getScreenName = (name: string): keyof NavigatorParamList => {
    switch (name) {
      case "presidents":
        return "presidents"
      default:
        return undefined
    }
  }
  return (
    <View testID="NameOfPlayersScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="welcomeScreen.poweredBy"
          style={HEADER}
          titleStyle={HEADER_TITLE}
          leftIcon="back"
          onLeftPress={goBack}
        />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Choose the name of players!" />
        </Text>
        {Array.from({ length: ongoingGameStore.numberOfPlayers }, (_, i) => i + 1).map((index) => (
          <TextField
            key={index}
            nativeID={index.toString()}
            placeholder={`Enter player ${index} name`}
            inputStyle={INPUT_STYLE}
            onBlur={handleInput}
          />
        ))}
        <Button
          style={MENU_BUTTON}
          textStyle={MENU_TEXT}
          text={"PLAY"}
          onPress={() => {
            const difference = ongoingGameStore.numberOfPlayers - players.length
            for (let i = 0; i < difference; i++) {
              const id = playerStore.getNextIndex()
              playerStore.addPlayer({
                id: Number(id),
                name: `Player ${id}`,
                score: 0,
              })
            }
            navigation.navigate(getScreenName(ongoingGameStore.game.name))
          }}
        />
      </Screen>
    </View>
  )
})
