import { Material } from "store/reducers/material-matrix.reducer";

export type MaterialForBackend = Omit<Material, "color" | "name">;

export const transformMaterialForBackend = (
  materials: Material[]
): MaterialForBackend[] => {
  return materials.map((material) => {
    return {
      id: material.id,
      eps: material.eps,
      mu: material.mu,
      sigma: material.sigma,
    };
  });
};
