const assert = require('chai').assert;

const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const MilitaryType = require('../models/MilitaryType');
const ExperimentalPlane = require('../Planes/ExperimentalPlane');
const ExperimentalTypes = require('../models/ExperimentalTypes');
const ClassificationLevel = require('../models/ClassificationLevel');

describe('Main Test', () => {

    let planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.TYPE_BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.TYPE_BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.TYPE_BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.TYPE_FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.TYPE_FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.TYPE_TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalTypes.HIGH_ALTITUDE, ClassificationLevel.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalTypes.VTOL, ClassificationLevel.TOP_SECRET)
    ];

    it('should have military Planes with transport type', () => {
        let airport = new Airport(planes);
        let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();

        assert.isTrue(!!transportMilitaryPlanes[0]);
    });

    it('should check passenger plane with max capacity', () => {
        let airport = new Airport(planes);
        let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);
        let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();

        assert.isFalse(expectedPlaneWithMaxPassengersCapacity === planeWithMaxPassengerCapacity);
    });


    it('next plane max load capacity is higher than current', () => {
        const airport = new Airport(planes).sortByMaxLoadCapacity();
        const planesSortedByMaxLoadCapacity = airport.getPlanes();

        const nextPlaneMaxLoadCapacityIsHigherThanCurrent = planesSortedByMaxLoadCapacity.every((currentPlane, i) => {
            const nextPlane = planesSortedByMaxLoadCapacity[i + 1];
            return !nextPlane || currentPlane.getMinLoadCapacity() <= nextPlane.getMinLoadCapacity();
        });

        assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
    });


    it('test has at least one bomber in military planes', () => {
        let bomberMilitaryPlanes = (new Airport(planes)).getBomberMilitaryPlanes();

        assert.isTrue(!!bomberMilitaryPlanes[0]);

    })

    it('should check that experimental planes has classification level higher than unclassified', () => {
        let experimentalMilitaryPlanes = (new Airport(planes)).getExperimentalPlanes();

        assert.isFalse(experimentalMilitaryPlanes.some(plane => plane.classificationLevel === ClassificationLevel.UNCLASSIFIED));
    });

});
