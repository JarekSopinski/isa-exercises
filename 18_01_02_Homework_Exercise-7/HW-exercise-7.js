/*
******************Struktura obiektu Company, rozpisana dla ułatwienia pracy******************

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

// Funkcje użyte do zbudowania obiektu z powyższych danych:

const company = {};

company.offices = offices.map(office => {
   return {
       id: office.id,
       name: office.name,
       headquater: office.headquarter || false,
       workers: workers.filter((workers) => {return workers.office === office.id})
   }
});

// Funkcje do operacji potrzebnych w kolejnych zadaniach:

const getOfficeInfo = (id) => {
    for (let i = 0; i < company.offices.length; i++) {
        if (id === company.offices[i].id) {
            console.log('City: ' + company.offices[i].name);
            console.log('Number of workers: ' + company.offices[i].workers.length);
            // Uzupełnić średnią pensję
        }
    };
};

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
    };
};

// Rozwiązania zadań:

// 1) Wyswietl, informacje o biurze w Gliwicach (lokalizacja, liczba przypisanych pracowników, srednia pensja),

getOfficeInfo('GL');

// 2) Dodaj nowe biuro (w Poznaniu)

addNewOffice('PO', 'Poznan', false);
console.log(company.offices[3]);

// 3) Dodaj nowego pracownika do biura w Poznaniu:

addNewWorker(16, 'Olek', 'M', 'PO', 500);
console.log(company.offices[3].workers[0]);