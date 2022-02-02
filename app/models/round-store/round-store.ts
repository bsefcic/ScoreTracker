import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from ".."
import { PlayerModel } from "../player/player"

export const RoundStoreModel = types
  .model("Round")
  .props({
    rankings: types.array(types.reference(PlayerModel)),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    addPlayer(playerId: number) {
      self.rankings.push(playerId)
    },
    clearRankings() {
      self.rankings.clear()
    }
  }))

type RoundType = Instance<typeof RoundStoreModel>
export interface Round extends RoundType {}
type RoundSnapshotType = SnapshotOut<typeof RoundStoreModel>
export interface RoundSnapshot extends RoundSnapshotType {}
export const createRoundDefaultModel = () => types.optional(RoundStoreModel, {})
