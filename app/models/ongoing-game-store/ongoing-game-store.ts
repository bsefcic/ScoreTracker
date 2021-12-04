import { types } from "mobx-state-tree"
import { withEnvironment } from ".."

export const OngoingGameModel = types
  .model("OngoingGameStore")
  .props({
    name: types.optional(types.string, ""),
    numberOfPlayers: types.optional(types.number, 0),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setGameName: (gameName: string) => {
      self.name = gameName
    },
    setNumberOfPlayers: (numberOfPlayers: number) => {
      self.numberOfPlayers = numberOfPlayers
    },
  }))
