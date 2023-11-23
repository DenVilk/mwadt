function Animal(name, species) {
    this.name = name;
    this.species = species;
}

Animal.prototype.getName = function () {
    return this.name;
};

Animal.prototype.getSpecies = function () {
    return this.species;
};

function Mammal(name, species, isMammal) {
    Animal.call(this, name, species);

    this.isMammal = isMammal;
}

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;

Mammal.prototype.getIsMammal = function () {
    return this.isMammal;
};


function logExecutionTime(descriptor) {
    const originalMethod = descriptor;

    descriptor = function () {
        console.log("Before calling original method")
        const result = originalMethod.call(this);
        console.log("After calling original method")

        return result;
    };

    return descriptor;
}

Mammal.prototype.getName = logExecutionTime(Mammal.prototype.getName);

const lion = new Mammal('Leo', 'Lion', true);
console.log(lion.getName());
console.log(lion.getSpecies());
console.log(lion.getIsMammal()); 