const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const { default: daisyui } = require("daisyui");

module.exports = {
  content: ["./src/**/*.{js, jsx, ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [addVariablesForColors, noScrollbar, require("daisyui"), ],
};

function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}


function noScrollbar({addUtilities}) {
  const newUtilities = {
    ".no-scrollbar::-webkit-scrollbar": {
      display: "none"
    },
    ".no-scrollbar": {
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
    }
  };
  addUtilities(newUtilities)
}