import { types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { GameModel } from "../Game/Game"

export const GameStoreModel = types
  .model("GameStore")
  .props({
    games: types.optional(types.array(GameModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    loadGames: () => {
      self.games.push({
        name: "presidents",
        minNumberOfPlayers: 3,
        maxNumberOfPlayers: 8,
      })
    },
  }))
