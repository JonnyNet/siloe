export const roles = [
    {
        nombre: 'Tesorero',
        uid: 'WHuBRKiM846hiXtyaO1V',
        orden : 1,
        creacion : new Date()
    },
    {
        nombre: 'Anciano',
        uid: 'S5HRngY0jCE0a77ftDiS',
        roles: [
            {
                nombre: 'Tesorero',
                uid: 'WHuBRKiM846hiXtyaO1V'
            }
        ],
        orden : 2,
        creacion : new Date()
    },
    {
        nombre: 'Pastor',
        uid: 'Hly6HKzhq0cFee5G1itn',
        roles: [
            {
                nombre: 'Tesorero',
                uid: 'WHuBRKiM846hiXtyaO1V'
            },
            {
                nombre: 'Anciano',
                uid: 'S5HRngY0jCE0a77ftDiS'
            }
        ],
        orden : 3,
        creacion : new Date()
    },
    {
        nombre: 'Asociación',
        uid: 'bLhygMYR5jEMP0ScoFpW',
        roles: [
            {
                nombre: 'Tesorero',
                uid: 'WHuBRKiM846hiXtyaO1V'
            },
            {
                nombre: 'Anciano',
                uid: 'S5HRngY0jCE0a77ftDiS'
            },
            {
                nombre: 'Pastor',
                uid: 'Hly6HKzhq0cFee5G1itn'
            }
        ],
        orden : 4,
        creacion : new Date()
    },
    {
        nombre: 'Admin',
        uid: 'fPfZqJx0l24i1TqYLulj',
        roles: [
            {
                nombre: 'Tesorero',
                uid: 'WHuBRKiM846hiXtyaO1V'
            },
            {
                nombre: 'Anciano',
                uid: 'S5HRngY0jCE0a77ftDiS'
            },
            {
                nombre: 'Pastor',
                uid: 'Hly6HKzhq0cFee5G1itn'
            },
            {
                nombre: 'Asociación',
                uid: 'bLhygMYR5jEMP0ScoFpW'
            },
            {
                nombre: 'Admin',
                uid: 'bLhygMYR5jEMP0ScoFpW'
            }
        ],
        orden : 5,
        creacion : new Date()
    }
];


export const menu = [

];