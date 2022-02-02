import { types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { Player, PlayerModel, PlayerSnapshot } from "../player/player"

export const PlayerStoreModel = types
  .model("PlayerStore")
  .props({
    players: types.optional(types.array(PlayerModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    savePlayers: (playerSnapshots: Player[]) => {
      self.players.replace(playerSnapshots)
    },
    addPlayer: (playerSnapshot: PlayerSnapshot) => {
      self.players.push(playerSnapshot)
    },
    getNextIndex: () => {
      if (self.players.length === 0) return 1
      return self.players[self.players.length - 1].id + 1
    },
    getPlayers: () => {
      return self.players
    },
    calculateScores: (rankings: Player[]) => {
      rankings.forEach((ranking, i) => {
        self.players.find((p) => p.id === ranking.id).score += self.players.length - i
      })
    },
    clearPlayers: () => {
      self.players.clear()
    },
  }))
