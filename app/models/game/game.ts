import { Instance, SnapshotOut, types } from "mobx-state-tree";

export const GameModel = types.model("Game").props({
    name: types.identifier,
    minNumberOfPlayers: types.optional(types.number, 0),
    maxNumberOfPlayers: types.optional(types.number, 0)
})

type GameType = Instance<typeof GameModel>
export interface Game extends GameType {}
type GameSnapshotType = SnapshotOut<typeof GameModel>
export interface GameSnapshot extends GameSnapshotType {}
export const createGameDefaultModel = () => types.optional(GameModel, {})