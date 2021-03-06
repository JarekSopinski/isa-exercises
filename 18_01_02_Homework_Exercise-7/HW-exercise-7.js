/*
Struktura obiektu 'company', rozpisana dla ułatwienia pracy:

Company {
    Offices [
            [0] {office 1
                .name
                .id
                .headquarter
                .workers
                    [
                        [0] {worker 1
                            .id
                            .name
                            .type
                            .office
                            .salary
                            }
                        [1] {worker 2
                            .id
                            .name
                            .type
                            .office
                            .salary
                            }
                     ]

            [1] {office 2
                .name
                .id
                .headquarter
                .workers
                    [
                        [0] {worker 1
                            .id
                            .name
                            .type
                            .office
                            .salary
                            }
                        [1] {worker 2
                            .id
                            .name
                            .type
                            .office
                            .salary
                            }
                     ]

Company { [.offices{office[.workers {worker}{worker}]}] }

*/

// Dane wyjściowe:


const offices = [
    { id: "GD", name: "Gdansk", headquarter: true },
    { id: "GL", name: "Gliwice" },
    { id: "KO", name: "Koszalin" }
];

const workers = [
    { id: 1,  name: "Bartek",     type: "P", office: "GD", salary: 300 },
    { id: 2,  name: "Wojtek",     type: "P", office: "GD", salary: 210 },
    { id: 3,  name: "Piotr",      type: "M", office: "GL", salary: 250 },
    { id: 4,  name: "Damian",     type: "P", office: "KO", salary: 290 },
    { id: 5,  name: "Jan",        type: "P", office: "GL", salary: 210 },
    { id: 6,  name: "Mateusz",    type: "P", office: "GD", salary: 290 },
    { id: 7,  name: "Weronika",   type: "M", office: "KO", salary: 240 },
    { id: 8,  name: "Gabriela",   type: "M", office: "GD", salary: 290 },
    { id: 9,  name: "Alina",      type: "M", office: "KO", salary: 290 },
    { id: 10, name: "Aleksander", type: "P", office: "GL", salary: 260 },
    { id: 11, name: "Tomek",      type: "P", office: "GD", salary: 200 },
    { id: 12, name: "Krzysztof",  type: "M", office: "KO", salary: 290 },
    { id: 13, name: "Marcin",     type: "P", office: "GD", salary: 280 },
    { id: 14, name: "Agata",      type: "P", office: "GD", salary: 230 },
    { id: 15, name: "Magda",      type: "P", office: "KO", salary: 220 }
];

// Budowa obiektu z powyższych danych:

const company = {};

company.offices = offices.map(office => {
   return {
       id: office.id,
       name: office.name,
       headquater: office.headquarter || false,
       workers: workers.filter((workers) => {return workers.office === office.id})
   }
});

// Funkcje potrzebne do rozwiązania zadań:

const addNewOffice = (id, name, headquarter) => {
    company.offices.push({
        id: id,
        name: name,
        headquarter: headquarter,
        workers: []
    });
};

const addNewWorker = (id, name, type, office, salary) => {
    let newWorker = {
        id: id,
        name: name,
        type: type,
        office: office,
        salary: salary
    };
    for (let i = 0; i < company.offices.length; i++) {
        if (newWorker.office === company.offices[i].id) {
            company.offices[i].workers.push(newWorker);
        }
    }
};

const getNumberOfWorkers = () => {
    let numberOfWorkers = 0;
    for (let i = 0; i < company.offices.length; i++) {
        numberOfWorkers += company.offices[i].workers.length;
    }
    return numberOfWorkers;
};

const getTotalSalary = () => {
    let totalSalary = 0;
    for (let i = 0; i < company.offices.length; i++) {
        for (let j = 0; j < company.offices[i].workers.length; j++) {
            totalSalary += company.offices[i].workers[j].salary;
        }
    }
    return totalSalary;
};

const getAverageSalary = () => {
  return Math.round(getTotalSalary() / getNumberOfWorkers())
};

const getNumberOfWorkersByOffice = (id) => {
    let numberOfWorkers = 0;
    for (let i = 0; i < company.offices.length; i++) {
        if (id === company.offices[i].id) {
            numberOfWorkers = company.offices[i].workers.length;
        }
    }
    return numberOfWorkers;
};

const getSalaryByOffice = (id) => {
    let totalSalary = 0;
    for (let i = 0; i < company.offices.length; i++) {
        if (id === company.offices[i].id) {
            totalSalary = company.offices[i].workers.reduce((acc, next) => {
                return acc + next.salary;
            }, 0);
        }
    }
    return totalSalary;
};

const getAverageSalaryByOffice = (id) => {
    return Math.round(getSalaryByOffice(id) / getNumberOfWorkersByOffice(id))
};

const getOfficeInfo = (id) => {
    for (let i = 0; i < company.offices.length; i++) {
        if (id !== 'GD' && id !== 'GL' && id !== 'KO' && id !== 'PO') {
            console.log('Nie ma takiego biura!');
        } else if (id === company.offices[i].id) {
            console.log('Miasto: ' + company.offices[i].name);
            console.log('Liczba pracownikow: ' + company.offices[i].workers.length);
            console.log('Srednia pensja: ' + getAverageSalaryByOffice(id));
        }
    }
};

const getBestSalary = () => {
    let bestSalary;
    for (let i = 0; i < company.offices.length; i++) {
        let bestSalaryByOffice = company.offices[i].workers[0].salary;
        for (let j = 0; j < company.offices[i].workers; j++) {
            if (company.offices[i].workers[j].salary > bestSalaryByOffice) {
                bestSalaryByOffice = company.offices[i].workers[j].salary;
            }
        }
        bestSalary = bestSalaryByOffice;
    }
    return bestSalary
};

const getBestWorker = () => {
    let bestWorker;
    for (let i = 0; i < company.offices.length; i++) {
        let bestWorkerByOffice = company.offices[i].workers[0].name;
        for (let j = 0; j < company.offices[i].workers; j++) {
            if (company.offices[i].workers[j].salary === getBestSalary()) {
                bestWorkerByOffice = company.offices[i].workers[j].name;
            }
        }
        bestWorker = bestWorkerByOffice;
    }
    return bestWorker
};

const getBestWorkerByCity = (id) => {
    let bestWorker;
    for (let i = 0; i < company.offices.length; i++) {
        if (id === company.offices[i].id) {
            let bestWorkerByOffice = company.offices[i].workers[0].salary;
            for (let j = 0; j < company.offices[i].workers; j++) {
                if (company.offices[i].workers[j].salary > bestWorkerByOffice) {
                    bestWorkerByOffice = company.offices[i].workers[j].salary;
                }
            }
            bestWorker = bestWorkerByOffice;
        }
    }
    return bestWorker
};


// ******************************Rozwiązania zadań***************************************

// 1) Wyswietl, informacje o biurze w Gliwicach (lokalizacja, liczba przypisanych pracowników, srednia pensja),

getOfficeInfo('GL');

// 2) Dodaj nowe biuro (w Poznaniu)

addNewOffice('PO', 'Poznan', false);
console.log(company.offices[3]);

// 3) Dodaj nowego pracownika do biura w Poznaniu:

addNewWorker(16, 'Olek', 'M', 'PO', 500);
console.log(company.offices[3].workers[0]);

// 4) Wyswietl, informacje o biurze w Poznaniu

getOfficeInfo('PO');

// 5) Wyswietl srednia pensje w calej firmie

console.log(getAverageSalary());

//6) Wyswietl najlepiej oplacanego pracownika w poszczególnych biurach

console.log(getBestWorkerByCity('GL'));
console.log(getBestWorkerByCity('KO'));
console.log(getBestWorkerByCity('GD'));
console.log(getBestWorkerByCity('PO'));
/*
Tutaj w części przypadków funkcja getBestWorkerByCity() wskazuje niewłaściwego pracownika.
Do tej pory nie udało mi się znaleźć przyczyny błędu.
 */

// 7) Wyswietl najlepiej oplacanego pracownika w calej firmie oraz nazwe jego biura.

console.log(getBestWorker());