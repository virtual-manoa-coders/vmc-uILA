/**
 * Calculate the methods of travel one user
 * @param timeSpan Only select data from today to the timespan
 * @param data The methods of transportation to retrieve
 * @returns {number[]} A 6-element array of # of mode of transport
 */
export const travelPatternsFunction = (data, timeSpan) => {
    const afterDateAndCar = this.props.data.filter(doc => doc.date > timeSpan);
    if (afterDateAndCar.length === 0) {
        return [0];
    }
    const transportMethod = afterDateAndCar.map(doc => doc.transport);
    const dataArray = [0, 0, 0, 0, 0, 0]; // We can only use an array for the Pie component. don't change
    transportMethod.forEach(doc => {
        switch (doc) {
            case 'Telecommute':
                dataArray[0] += 1;
                break;
            case 'Walk':
                dataArray[1] += 1;
                break;
            case 'Bike':
                dataArray[2] += 1;
                break;
            case 'Carpool':
                dataArray[3] += 1;
                break;
            case 'Bus':
                dataArray[4] += 1;
                break;
            case 'Car':
                dataArray[5] += 1;
                break;
            default:
                console.log('Error: Unexpected transport type');
                break;
        }
    });
    return dataArray;
};
