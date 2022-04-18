/**
 * @see mixins/helper-functions.js
 * let's use some early added feature to the ES javascript
 * mixins to quickly access our handful functions!
 */
[
    TechDiversityRace,
    TechDiversityGender,
    PayGapByJob2017,
    PayGapTimeSeries,
    ClimateChange,
    PieChart,
    Htmlable
].forEach((clss) => {
    Object.assign(clss.prototype, HelperMixins);
});
