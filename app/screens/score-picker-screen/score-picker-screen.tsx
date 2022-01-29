import React, { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, GradientBackground } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import { PlayerSnapshot } from "../../models/player/player"

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
  display: "flex",
}

export const ScorePickerScreen: FC<StackScreenProps<NavigatorParamList, "scorePicker">> = observer(
  ({ navigation }) => {
    const { playerStore, OngoingGame } = useStores()
    const { players } = playerStore

    const goBack = () => navigation.goBack()

    let scoreAmount = OngoingGame.numberOfPlayers

    let numberOfClicks = 1
    playerStore.getPlayers().map((player) => {
      return {
        playerId: player.id,
        playerName: player.name,
        playerScore: player.score,
        clicked: false,
      }
    })
    const button : HTMLInputElement

    const saveScores = () => {
      playerStore.savePlayers(
        buttonProps.map((buttonProp) => {
          return {
            id: buttonProp.playerId,
            name: buttonProp.playerName,
            score: buttonProp.playerScore,
          }
        }),
      )
    }

    return (
      <View testID="scorePicker" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="welcomeScreen.poweredBy"
            style={HEADER}
            titleStyle={HEADER_TITLE}
            leftIcon="back"
            onLeftPress={goBack}
          />
          <div>
            {buttonProps.map((buttonProp) => {
              return (
                <Button
                  key={buttonProp.playerId}
                  style={MENU_BUTTON}
                  textStyle={MENU_TEXT}
                  text={buttonProp.playerName}
                  disabled={buttonProp.clicked}
                  onPress={() => {
                    buttonProp.playerScore += scoreAmount
                    scoreAmount--
                    if (numberOfClicks === players.length) {
                      saveScores()
                      navigation.goBack()
                    }
                    numberOfClicks++
                  }}
                />
              )
            })}
          </div>
        </Screen>
      </View>
    )
  },
)
