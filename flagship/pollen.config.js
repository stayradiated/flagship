module.exports = (pollen) => ({
  output: './app/pollen.css',
  modules: {
    font: {
      ...pollen.font,
      sans: `Work Sans, ${pollen.font.sans}`,
    }
  }
})
