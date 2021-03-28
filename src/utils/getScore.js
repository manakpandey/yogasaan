export function getScore(reqdDict, obtdDict) {
  var scoreDict = {
    leftElbowAngle: 0,
    leftHipAngle: 0,
    leftKneeAngle: 0,
    leftShoulderAngle: 0,
    rightElbowAngle: 0,
    rightHipAngle: 0,
    rightKneeAngle: 0,
    rightShoulderAngle: 0,
    totalScore: 0,
  };

  //To check if any individual angle has the value 0
  var flag = 0;
  var scoresum = 0;

  for (var key in obtdDict) {
    // check if the property/key is defined in the object itself, not in parent
    if (obtdDict.hasOwnProperty(key)) {
      if (obtdDict[key] != -1 && reqdDict[key] != -1) {
        var deviation = Math.abs(obtdDict[key] - reqdDict[key]);
        var accuracy = 100 - (100 / 180) * deviation;

        if (accuracy < 70 || accuracy > 100) {
          scoreDict[key] = 0;
          scoreDict["totalScore"] = 0;
          flag = -1;
        } else {
          scoreDict[key] = accuracy;
          scoresum += accuracy;
        }
      }
    }
  }

  if (flag == 0) {
    scoreDict["totalScore"] = scoresum / 8;
  }

  return scoreDict;
}
