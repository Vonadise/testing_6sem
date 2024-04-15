const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const MilitaryType = require('./models/militaryType');
const experimentalPlane = require('./Planes/ExperimentalPlane');

class Airport {

    constructor(planes) {
        this.planes = planes;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }

    getPassengerPlane() {
        return this.planes.filter(plane => plane instanceof PassengerPlane)
    }

    getMilitaryPlanes() {
        return this.planes.filter(plane => plane instanceof MilitaryPlane)
    }

    getTransportMilitaryPlanes() {
        let militaryPlanes = this.getMilitaryPlanes();

        return militaryPlanes.filter((plane) => plane.getMilitaryType() === MilitaryType.TYPE_TRANSPORT);
    }

    getBomberMilitaryPlanes() {
        let militaryPlanes = this.getMilitaryPlanes();

        return militaryPlanes.filter((plane) => plane.getMilitaryType() === MilitaryType.TYPE_BOMBER);
    }

    getExperimentalPlanes() {
        return this.planes.filter(plane => plane instanceof experimentalPlane)
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        let planes = this.getPassengerPlane();
        let planeWithMaxCapacity = planes[0];
        for (let i = 0; i < planes.length; i++) {
            if (planes[i].getPassengersCapacity() > planeWithMaxCapacity.getPassengersCapacity()) {
                planeWithMaxCapacity = planes[i];
            }
        }
        return planeWithMaxCapacity;
    }

    sortByMaxDistance() {
        this.planes.sort((a, b) => (a.getMaxFlightDistance() > b.getMaxFlightDistance()) ? 1 : -1);
        return this;
    }

    sortByMaxSpeed() {
        this.planes.sort((a, b) => (a.getMS() > b.getMS()) ? 1 : -1);
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => (a.getMinLoadCapacity() > b.getMinLoadCapacity()) ? 1 : -1);
        return this;
    }

    getPlanes() {
        return this.planes;
    }
}

module.exports = Airport;
