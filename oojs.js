class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return `${this.name} hangot ad ki.`;
    }

    render() {
        const div = document.createElement('div');
        div.textContent = this.speak();
        document.getElementById('zoo').appendChild(div);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }

    speak() {
        return `${this.name} ugat: Vau-vau!`;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
    }

    speak() {
        return `${this.name} nyávog: Miaú!`;
    }
}

function addDog() {
    const dog = new Dog("Bodri");
    dog.render();
}

function addCat() {
    const cat = new Cat("Cirmi");
    cat.render();
}