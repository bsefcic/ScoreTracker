import { types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { RoundStoreModel } from "../round-store/round-store"

export const OngoingGameStoreModel = types
  .model("OngoingGameStore")
  .props({
    name: types.optional(types.string, ""),
    numberOfPlayers: types.optional(types.number, 0),
    roundOngoing: types.optional(types.boolean, false),
    rounds: types.optional(types.array(RoundStoreModel), [])
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
