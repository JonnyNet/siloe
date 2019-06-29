interface NavAttributes {
    [propName: string]: any;
}
interface NavWrapper {
    attributes: NavAttributes;
    element: string;
}
interface NavBadge {
    text: string;
    variant: string;
}
interface NavLabel {
    class?: string;
    variant: string;
}

export interface NavData {
    name?: string;
    url?: string;
    icon?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: NavData[];
    variant?: string;
    attributes?: NavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
    {
        title: true,
        name: 'APP'
    },
    {
        name: 'configuracion',
        url: '/config',
        icon: 'icon-star',
        children: [
            {
                name: 'Iglesias',
                url: '/config/iglesia',
                icon: 'icon-star'
            },
            {
                name: 'Cargos',
                url: '/config/cargos',
                icon: 'icon-star'
            },
            {
                name: 'Roles',
                url: '/config/roles',
                icon: 'icon-star'
            }
        ]
    },
    {
        name: 'Seguridad',
        url: '/seguridad',
        icon: 'icon-star',
        children: [
            {
                name: 'Usuarios',
                url: '/seguridad/usuarios',
                icon: 'icon-star'
            },
            {
                name: 'Perfiles',
                url: '/seguridad/perfiles',
                icon: 'icon-star'
            },
            {
                name: 'Permisos',
                url: '/seguridad/permisos',
                icon: 'icon-star'
            },
            {
                name: 'Opciones',
                url: '/seguridad/opciones',
                icon: 'icon-star'
            }
        ]
    },
    {
        name: 'Tesoreria',
        url: '/tesoreria',
        icon: 'icon-star',
        children: [
            {
                name: 'Alfoli',
                url: '/tesoreria/alfoli',
                icon: 'icon-star'
            },
            {
                name: 'Semanal',
                url: '/tesoreria/semanal',
                icon: 'icon-star'
            }
        ]
    }
];
