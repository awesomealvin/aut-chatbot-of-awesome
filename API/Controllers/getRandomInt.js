/**
 * Generates a random integer between 0 and max
 * @author Thom Bilton
 * @param {number} max The max number that can be generated
 * @return {number} The random generated number rounded down
 */
module.exports.getRandomInt = function(max) {
    return Math.floor(Math.random() * (max - 0) );
}
