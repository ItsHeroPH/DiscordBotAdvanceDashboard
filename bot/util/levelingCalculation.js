function calculateXPRequirement(level) {
    return Math.floor(Math.pow(level + 1, 2) * 16);
}
function calculateLevelAfterRemovingXP(currentXP, currentLevel, xpToRemove) {
    const remainingXP = Math.floor(currentXP - xpToRemove);
    const level = remainingXP < 0 ? currentLevel - 1 : currentLevel
    return level;
}
function calculateLevelAfterAddingXP(currentXP, currentLevel, xpToAdd) {
    const totalXP = Math.floor(currentXP + xpToAdd);
    const xpRequirement = calculateXPRequirement(currentLevel)
    const level = xpRequirement < totalXP ? currentLevel + 1 : currentLevel
    return level;
}
module.exports = {
    calculateXPRequirement,
    calculateLevelAfterRemovingXP,
    calculateLevelAfterAddingXP
}