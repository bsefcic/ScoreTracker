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
  display: "flex",
}

export const ScorePickerScreen: FC<StackScreenProps<NavigatorParamList, "scorePicker">> = observer(
  ({ navigation }) => {
    const { roundStore, playerStore } = useStores()
    const { players } = playerStore
    const goBack = () => {
      roundStore.clearRankings()
      navigation.goBack()
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
            {players.map((roundPlayer) => {
              return (
                <Button
                  key={roundPlayer.id}
                  style={MENU_BUTTON}
                  textStyle={MENU_TEXT}
                  text={roundPlayer.name}
                  disabled={roundStore.rankings.includes(roundPlayer)}
                  onPress={() => {
                    roundStore.addPlayer(roundPlayer.id)
                  }}
                />
              )
            })}
            <Button
              key="finish-button"
              style={MENU_BUTTON}
              textStyle={MENU_TEXT}
              text="FINISH"
              disabled={roundStore.rankings.length !== players.length}
              onPress={() => {
                playerStore.calculateScores(roundStore.rankings)
                roundStore.clearRankings()
                navigation.goBack()
              }}
            />
          </div>
        </Screen>
      </View>
    )
  },
)
