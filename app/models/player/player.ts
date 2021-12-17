import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from ".."

export const PlayerModel = types
  .model("Player")
  .props({
    id: types.identifierNumber,
    name: types.maybe(types.string),
    score: types.maybe(types.number),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    addScore: (score: number) => {
      self.score += score
    },
  }))

type PlayerType = Instance<typeof PlayerModel>
export interface Player extends PlayerType {}
type PlayerSnapshotType = SnapshotOut<typeof PlayerModel>
export interface PlayerSnapshot extends PlayerSnapshotType {}
export const createPlayerDefaultModel = () => types.optional(PlayerModel, {})
