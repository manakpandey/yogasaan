function getScore(reqdAngle, obtdAngle) {
    
    var deviation = Math.abs(obtdAngle - reqdAngle);
    var accuracy = 100 - ((100/180)*deviation);

    if(accuracy<70||accuracy>100)
        return 0;

    else {
        return accuracy;
    }
}
