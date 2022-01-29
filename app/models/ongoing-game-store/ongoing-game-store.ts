import { types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { RoundModel } from "../round/round"

export const OngoingGameStoreModel = types
  .model("OngoingGameStore")
  .props({
    name: types.optional(types.string, ""),
    numberOfPlayers: types.optional(types.number, 0),
    roundOngoing: types.optional(types.boolean, false),
    rounds: types.optional(types.array(RoundModel), [])
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setGameName: (gameName: string) => {
      self.name = gameName
    },
    setNumberOfPlayers: (numberOfPlayers: number) => {
      self.numberOfPlayers = numberOfPlayers
    },
    setRoundOngoing: (roundOngoing: boolean) => {
      self.roundOngoing = roundOngoing
    },
  }))
