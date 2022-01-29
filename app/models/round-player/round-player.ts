import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const RoundPlayerModel = types
  .model("RoundPlayerModel")
  .props({
    id: types.maybe(types.identifierNumber),
    name: types.maybe(types.string),
    scoreWon: types.optional(types.number, Number.EPSILON),
    rank: types.maybe(types.number)
  })

type RoundPlayerType = Instance<typeof RoundPlayerModel>
export interface RoundPlayer extends RoundPlayerType {}
type RoundPlayerSnapshotType = SnapshotOut<typeof RoundPlayerModel>
export interface RoundPlayerSnapshot extends RoundPlayerSnapshotType {}
export const createRoundPlayerDefaultModel = () => types.optional(RoundPlayerModel, {})
