interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [

        {
            description: "pendientes sdjsdfjhdfk DFhjgfhDFHL D dfkjGFHJsg fSFGJrghu rgrg ",
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: "enprogreso sdjsdfjhdfk DFhjgfhDFHL D dfkjGFHJsg fSFGJrghu rgrg ",
            status: 'in-progress',
            createdAt: Date.now()
        },
        {
            description: "terminadas sdjsdfjhdfk DFhjgfhDFHL D dfkjGFHJsg fSFGJrghu rgrg ",
            status: 'finished',
            createdAt: Date.now()
        }
    ]
}