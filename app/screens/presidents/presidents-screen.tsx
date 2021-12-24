import React, { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, GradientBackground } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import { TxKeyPath } from "../../i18n"

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

let scorDeDat = 0

export const PresidentsScreen: FC<StackScreenProps<NavigatorParamList, "presidents">> = observer(
  ({ navigation }) => {
    const { playerStore, gameStore, ongoingGameStore } = useStores()
    const { players } = playerStore
    if (scorDeDat === 0) {
      scorDeDat = ongoingGameStore.numberOfPlayers
    }
    const goBack = () => navigation.goBack()

    return (
      <View testID="presidents" style={FULL}>
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
            {ongoingGameStore.roundOngoing ? (
              players.map((player) => (
                  <Button
                    key={player.id}
                    style={MENU_BUTTON}
                    textStyle={MENU_TEXT}
                    text={player.name + player.id}
                    disabled = {player.attended}
                    onPress={() => {
                      player.addScore(scorDeDat)
                      scorDeDat -= 1
                      if (scorDeDat === 0) {
                        scorDeDat = ongoingGameStore.numberOfPlayers
                        ongoingGameStore.setRoundOngoing(false)
                      }
                      console.log(player + " are scorul: " + player.score)
                      player.setAttended(true)
                    }}
                  />

                )
              )) : (
              <div>
                <Button
                  style={MENU_BUTTON}
                  textStyle={MENU_TEXT}
                  onPress={() => (
                    players.map((player) => (
                      player.setAttended(false)
                    )),
                    ongoingGameStore.setRoundOngoing(true)
                  )
                  }
                  text="Start Round"
                />
                <Button
                  style={MENU_BUTTON}
                  textStyle={MENU_TEXT}
                  onPress={() => {
                    //de implementat
                    console.log("Sa scoata scoru")
                  }}
                  text="Show score"
                />
              </div>
            )}
          </div>
        </Screen>
      </View>
    )
  },
)
