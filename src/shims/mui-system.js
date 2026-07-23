// Vite 8/Rolldown does not currently follow @mui/system's star re-export for
// these color utilities when @mui/x-data-grid pulls in @mui/material/styles.
// Export them directly while preserving the rest of the package surface.
export {
    alpha,
    darken,
    decomposeColor,
    emphasize,
    getContrastRatio,
    getLuminance,
    hexToRgb,
    hslToRgb,
    lighten,
    recomposeColor,
    rgbToHex,
} from "@mui/system/colorManipulator";

export * from "../../node_modules/@mui/system/index.mjs";
