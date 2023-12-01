class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }

    getName() {
        return this.name;
    }

    getSpecies() {
        return this.species;
    }
}

class Mammal extends Animal {
    constructor(name, species, isMammal) {
        super(name, species);

        this.isMammal = isMammal;
    }

    getIsMammal() {
        return this.isMammal;
    }

    getName() {
        return super.getName();
    }

    getName = logExecutionTime(this.getName)
}

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


const elephant = new Mammal('Ellie', 'Elephant', true);
console.log(elephant.getName());
console.log(elephant.getSpecies());
console.log(elephant.getIsMammal()); 