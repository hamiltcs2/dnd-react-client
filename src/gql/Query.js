import { gql } from "@apollo/client";
export const GET_MONSTERS = gql`
  {
    monsters {
      name
      strength
      dexterity
      constitution
      intelligence
      wisdom
      charisma
      hit_points
      armor_class
      senses {
          passive_perception
      }
      type
    }
  }
`;