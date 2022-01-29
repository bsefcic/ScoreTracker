import React, { FC } from "react"
import { FlatList, View, ViewStyle, TextStyle } from "react-native"
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
  textAlign: "center",
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

const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}

export const ScoreTableScreen: FC<StackScreenProps<NavigatorParamList, "scoreTable">> = observer(
  ({ navigation }) => {
    const { OngoingGame, playerStore } = useStores()
    const { players } = playerStore

    const goBack = () => navigation.goBack()

    const handleInput = (event) => {
      playerStore.addPlayer({
        id: Number(event.target.id),
        name: event.target.value,
        score: 0,
      })
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
      <View testID="ScoreTableScreen" style={FULL}>
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
            <Text style={TITLE} text="Score" />
          </Text>
          {/* {players.map((player) => (
            <Text style={MENU_TEXT}>
              {player.name} {player.score}
            </Text>
          ))} */}
          <FlatList
            contentContainerStyle={FLAT_LIST}
            data={[...players]}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={LIST_CONTAINER}>
                <Text style={LIST_TEXT}>
                  {item.name} ({item.score})
                </Text>
              </View>
            )}
          />
        </Screen>
      </View>
    )
  },
)
