import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { RoundPlayerModel, RoundPlayerSnapshot } from "../round-player/round-player"

/**
 * Rick and Morty Round model.
 */
export const RoundModel = types
  .model("Round")
  .props({
    roundPlayers: types.optional(types.array(RoundPlayerModel), []),
    winner: types.maybe(RoundPlayerModel),
    loser: types.maybe(RoundPlayerModel),
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
  }))

type RoundType = Instance<typeof RoundModel>
export interface Round extends RoundType {}
type RoundSnapshotType = SnapshotOut<typeof RoundModel>
export interface RoundSnapshot extends RoundSnapshotType {}
export const createRoundDefaultModel = () => types.optional(RoundModel, {})
