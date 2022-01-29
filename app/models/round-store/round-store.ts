import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { PlayerSnapshot } from "../player/player"
import { RoundPlayerModel, RoundPlayerSnapshot } from "../round-player/round-player"

export const RoundStoreModel = types
  .model("Round")
  .props({
    roundPlayers: types.optional(types.array(RoundPlayerModel), []),
    winner: types.maybe(types.reference(RoundPlayerModel)),
    loser: types.maybe(types.reference(RoundPlayerModel)),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setRoundPLayers: (roundPlayers: RoundPlayerSnapshot[]) => {
      self.roundPlayers.replace(roundPlayers)
    },
    getRoundPlayers: () => {
      return self.roundPlayers
    },
    setWinner: (player: RoundPlayerSnapshot) => {
      self.winner = player
    },
    setLoser: (player: RoundPlayerSnapshot) => {
      self.loser = player
    },
    setScoreWonToPlayer: (playerId: number, amount: number) => {
      self.roundPlayers.forEach(
        (roundPlayer) => roundPlayer.id === playerId && (roundPlayer.scoreWon = amount),
      )
    },
    setGamePlayers: (gamePlayers: PlayerSnapshot[]) => {
      gamePlayers.forEach((gamePlayer) => {
        self.roundPlayers.push({
          id: gamePlayer.id,
          name: gamePlayer.name,
        })
      })
    },
    emptyPlayers: () => {
      self.roundPlayers.splice(0, self.roundPlayers.length)
    },
    allPLayersPicked: () => {
      return self.winner !== undefined && self.loser !== undefined
    },
  }))

type RoundType = Instance<typeof RoundStoreModel>
export interface Round extends RoundType {}
type RoundSnapshotType = SnapshotOut<typeof RoundStoreModel>
export interface RoundSnapshot extends RoundSnapshotType {}
export const createRoundDefaultModel = () => types.optional(RoundStoreModel, {})
