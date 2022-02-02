import { types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { GameModel } from "../game/game"
import { PlayerModel } from "../player/player"
import { RoundStoreModel } from "../round-store/round-store"

export const OngoingGameStoreModel = types
  .model("OngoingGameStore")
  .props({
    game: types.maybe(types.reference(GameModel)),
    numberOfPlayers: types.optional(types.number, 0),
    roundOngoing: types.optional(types.boolean, false),
    rounds: types.optional(types.array(RoundStoreModel), []),
    players: types.optional(types.array(PlayerModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setGame: (gameName: string) => {
      self.game = gameName as any
    },
    setNumberOfPlayers: (numberOfPlayers: number) => {
      self.numberOfPlayers = numberOfPlayers
    },
    setRoundOngoing: (roundOngoing: boolean) => {
      self.roundOngoing = roundOngoing
    },
  }))
