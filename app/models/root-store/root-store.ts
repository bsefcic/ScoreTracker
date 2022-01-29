import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { GameStoreModel } from "../game-store/game-store"
import { OngoingGameModel } from "../ongoing-game/ongoing-game"
import { PlayerStoreModel } from "../player-store/player-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  playerStore: types.optional(PlayerStoreModel, {} as any),
  gameStore: types.optional(GameStoreModel, {} as any),
  OngoingGame: types.optional(OngoingGameModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
