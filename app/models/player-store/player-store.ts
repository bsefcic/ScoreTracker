import { types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { PlayerModel, PlayerSnapshot } from "../player/player"

export const PlayerStoreModel = types
  .model("PlayerStore")
  .props({
    players: types.optional(types.array(PlayerModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    savePlayers: (playerSnapshots: PlayerSnapshot[]) => {
      self.players.replace(playerSnapshots)
    },
    addPlayer: (playerSnapshot: PlayerSnapshot) => {
      const playerToReplace = self.players.find((player) => player.id === playerSnapshot.id)
      if (playerToReplace) self.players.remove(playerToReplace)
      self.players.push(playerSnapshot)
      console.log("Adding player " + playerSnapshot)
    },
    deleteAllPlayers: () => {
      self.players.splice(0, self.players.length)
    },
    getNextIndex: () => {
      if (self.players.length === 0) return 1
      return self.players[self.players.length - 1].id + 1
    },
    getPlayers: () => {
      return self.players
    },
  }))
