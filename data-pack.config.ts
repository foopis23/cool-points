import { packConfig, functionConfig, command } from "ts-datapacks";
import { BLOCK_IDS } from "./blocks";

export default packConfig({
  namespace: "cool_points",
  outDir: "cool_points",
  functions: [
    functionConfig({
      name: "setup",
      command: command`
        summon armor_stand 0 318 0 {Invisible:1b,Invulnerable:1b,NoAI:1b,NoGravity:1b,Silent:1b,Tags:["cool_points_data"]}
        scoreboard objectives add current_objective dummy
      `,
    }),
    functionConfig({
      name: "update_objective",
      command: command`
        execute store result score @n[tag=cool_points_data] current_objective run random value 0..${
          BLOCK_IDS.length
        }
        scoreboard objectives remove cool_points

        ${BLOCK_IDS.map(
          (blockId, index) =>
            command`execute if score @n[tag=cool_points_data] current_objective matches ${
              index + 1
            } run scoreboard objectives add cool_points mined:${blockId}`
        )}

        scoreboard objectives setdisplay sidebar cool_points
      `,
    }),
    functionConfig({
      name: "announce_current_objective",
      command: command`
        ${BLOCK_IDS.map(
          (blockId, index) =>
            command`execute if score @n[tag=cool_points_data] current_objective matches ${
              index + 1
            } run tellraw @a {"text":"Mine ","color":"gray","extra":[{"text":"${blockId}","color":"dark_gray"}]}`
        )}
      `,
    }),
  ],
});
